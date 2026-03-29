import css from './style.module.css';
import classNames from 'classnames';
import {
	Spinner,
	DropdownMenu,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {
	setActiveSite,
	useActiveSite,
	useAppDispatch,
	useAppSelector,
} from '../../lib/state/redux/store';
import type { PlaygroundDispatch } from '../../lib/state/redux/store';
import type { SiteLogo, SiteInfo } from '../../lib/state/redux/slice-sites';
import {
	selectSortedSites,
	selectTemporarySite,
	removeSite,
} from '../../lib/state/redux/slice-sites';
import {
	modalSlugs,
	setActiveModal,
	setSiteManagerOpen,
	setSiteManagerSection,
	setSiteSlugToRename,
} from '../../lib/state/redux/slice-ui';
import { WordPressIcon } from '@wp-playground/components';
import useFetch from '../../lib/hooks/use-fetch';
import {
	PlaygroundRoute,
	redirectTo,
	isInstallDisabledByQueryParam,
} from '../../lib/state/url/router';
import {
	Overlay,
	OverlayHeader,
	OverlayBody,
	OverlaySection,
} from '../overlay';

type BlueprintsIndexEntry = {
	title: string;
	description: string;
	author: string;
	categories: string[];
	path: string;
	screenshot_url?: string;
	featured?: boolean;
};

export type OverlayViewMode = 'main' | 'blueprints';

interface SavedPlaygroundsOverlayProps {
	onClose: () => void;
	initialViewMode?: OverlayViewMode;
}

function GridIcon({ size = 20 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
			<path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z" />
		</svg>
	);
}

export function SavedPlaygroundsOverlay({
	onClose,
	initialViewMode = 'main',
}: SavedPlaygroundsOverlayProps) {
	const storedSites = useAppSelector(selectSortedSites).filter(
		(site) => site.metadata.storage !== 'none'
	);
	const temporarySite = useAppSelector(selectTemporarySite);
	const activeSite = useActiveSite();
	const dispatch = useAppDispatch();
	const modalDispatch: PlaygroundDispatch = useDispatch();

	const [viewMode, setViewMode] = useState<OverlayViewMode>(initialViewMode);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTag, setSelectedTag] = useState<string | null>(null);

	const {
		data: blueprintsData,
		isLoading: blueprintsLoading,
		isError: blueprintsError,
	} = useFetch<Record<string, BlueprintsIndexEntry>>(
		'https://raw.githubusercontent.com/WordPress/blueprints/trunk/index.json'
	);

	const allBlueprints: BlueprintsIndexEntry[] = blueprintsData
		? Object.entries(blueprintsData).map(([path, entry]) => ({
				...entry,
				path,
			}))
		: [];

	const previewBlueprints = allBlueprints.slice(0, 5);

	const tagCounts = new Map<string, number>();
	allBlueprints.forEach((b) => {
		(b.categories || []).forEach((tag) => {
			tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
		});
	});
	const allTags = Array.from(tagCounts.keys())
		.filter((tag) => tag.substring(0, 1).match(/^[A-Z]$/))
		.sort((a, b) => {
			const countDiff = (tagCounts.get(b) || 0) - (tagCounts.get(a) || 0);
			if (countDiff !== 0) return countDiff;
			return 0;
		});

	const filteredBlueprints = allBlueprints.filter((blueprint) => {
		const query = searchQuery.toLowerCase();
		const matchesSearch =
			!searchQuery ||
			blueprint.title.toLowerCase().includes(query) ||
			blueprint.description.toLowerCase().includes(query) ||
			blueprint.categories?.some((cat) =>
				cat.toLowerCase().includes(query)
			);

		const matchesTag =
			!selectedTag ||
			(selectedTag === 'Featured'
				? blueprint.featured === true
				: blueprint.categories?.includes(selectedTag));

		return matchesSearch && matchesTag;
	});

	const onSiteClick = (slug: string) => {
		dispatch(setActiveSite(slug));
		dispatch(setSiteManagerSection('site-details'));
		onClose();
	};

	const onTemporaryPlaygroundClick = () => {
		if (temporarySite) {
			dispatch(setActiveSite(temporarySite.slug));
			dispatch(setSiteManagerSection('site-details'));
			onClose();
		} else {
			createVanillaSite();
		}
	};

	const getLogoDataURL = (logo: SiteLogo): string => {
		return `data:${logo.mime};base64,${logo.data}`;
	};

	const handleDeleteSite = async (site: SiteInfo, closeMenu: () => void) => {
		const proceed = window.confirm(
			`Are you sure you want to delete the site '${site.metadata.name}'?`
		);
		if (proceed) {
			await dispatch(removeSite(site.slug));
			closeMenu();
		}
	};

	const handleRenameSite = (site: SiteInfo, closeMenu: () => void) => {
		dispatch(setSiteSlugToRename(site.slug));
		modalDispatch(setActiveModal(modalSlugs.RENAME_SITE));
		closeMenu();
	};

	function previewBlueprint(blueprintPath: BlueprintsIndexEntry['path']) {
		dispatch(setSiteManagerOpen(false));
		redirectTo(
			PlaygroundRoute.newTemporarySite({
				query: {
					name: 'Blueprint preview',
					'blueprint-url': `https://raw.githubusercontent.com/WordPress/blueprints/trunk/${blueprintPath.replace(
						/^\//,
						''
					)}`,
				},
			})
		);
		onClose();
	}

	function createVanillaSite() {
		dispatch(setSiteManagerOpen(false));
		redirectTo(PlaygroundRoute.newTemporarySite());
		onClose();
	}

	const creationOptions = [
		{
			id: 'tinyrelated',
			title: 'tinyRelated',
			iconComponent: <WordPressIcon />,
			onClick: () => {
				window.location.href = '/tinyrelated';
			},
			disabled: false,
		},
		{
			id: 'tinyrating',
			title: 'tinyRating',
			iconComponent: <WordPressIcon />,
			onClick: () => {
				window.location.href = '/tinyrating';
			},
			disabled: false,
		},
		{
			id: 'tinyevent',
			title: 'tinyEvent',
			iconComponent: <WordPressIcon />,
			onClick: () => {
				window.location.href = '/tinyevent';
			},
			disabled: false,
		},
	];

	if (viewMode === 'blueprints') {
		return (
			<Overlay onClose={onClose}>
				<OverlayHeader
					onClose={onClose}
					onBack={() => {
						setViewMode('main');
						setSearchQuery('');
						setSelectedTag(null);
					}}
					title="Blueprints"
					showLogo={false}
				/>
				<div className={css.filtersBar}>
					<div className={css.tagsContainer}>
						<button
							className={classNames(css.tagButton, {
								[css.tagButtonActive]: selectedTag === null,
							})}
							onClick={() => setSelectedTag(null)}
						>
							All
						</button>
						<button
							className={classNames(css.tagButton, {
								[css.tagButtonActive]:
									selectedTag === 'Featured',
							})}
							onClick={() =>
								setSelectedTag(
									selectedTag === 'Featured'
										? null
										: 'Featured'
								)
							}
						>
							Featured
						</button>
						{allTags.slice(0, 8).map((tag) => (
							<button
								key={tag}
								className={classNames(css.tagButton, {
									[css.tagButtonActive]: selectedTag === tag,
								})}
								onClick={() =>
									setSelectedTag(
										selectedTag === tag ? null : tag
									)
								}
							>
								{tag}
							</button>
						))}
					</div>
					<div className={css.searchWrapper}>
						<div className={css.searchIcon}>
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.35-4.35" />
							</svg>
						</div>
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search Blueprints"
							className={css.searchField}
							autoFocus
						/>
					</div>
				</div>
				<OverlayBody>
					<OverlaySection
						title={
							selectedTag || searchQuery
								? `Showing ${filteredBlueprints.length} of ${allBlueprints.length} blueprints`
								: `Showing all ${filteredBlueprints.length} blueprints`
						}
					>
						{blueprintsLoading ? (
							<div className={css.loadingContainer}>
								<Spinner />
							</div>
						) : blueprintsError ? (
							<p className={css.emptyMessage}>
								Unable to load blueprints. Check your
								connection.
							</p>
						) : filteredBlueprints.length === 0 ? (
							<p className={css.emptyMessage}>
								No blueprints found matching your criteria.
							</p>
						) : (
							<div className={css.blueprintsFullGrid}>
								{filteredBlueprints.map((blueprint) => (
									<button
										key={blueprint.path}
										className={css.blueprintCard}
										onClick={() =>
											previewBlueprint(blueprint.path)
										}
									>
										<div className={css.blueprintThumbnail}>
											{blueprint.screenshot_url ? (
												<img
													src={
														blueprint.screenshot_url
													}
													alt=""
													loading="lazy"
												/>
											) : (
												<div
													className={
														css.blueprintPlaceholder
													}
												>
													<WordPressIcon />
												</div>
											)}
										</div>
										<div className={css.blueprintInfo}>
											<h3 className={css.blueprintTitle}>
												{blueprint.title}
											</h3>
											<p
												className={
													css.blueprintDescription
												}
											>
												{blueprint.description}
											</p>
											{blueprint.categories &&
												blueprint.categories.length >
													0 && (
													<div
														className={
															css.blueprintTags
														}
													>
														{blueprint.categories
															.slice(0, 3)
															.map((tag) => (
																<span
																	key={tag}
																	className={
																		css.blueprintTag
																	}
																>
																	{tag}
																</span>
															))}
													</div>
												)}
										</div>
									</button>
								))}
							</div>
						)}
					</OverlaySection>
				</OverlayBody>
			</Overlay>
		);
	}

	return (
		<Overlay onClose={onClose}>
			<OverlayHeader onClose={onClose} />
			<OverlayBody>
				<OverlaySection title="Start a new Playground">
					<div className={css.creationRow}>
						{creationOptions.map((option) => (
							<button
								key={option.id}
								className={css.creationButton}
								onClick={option.onClick}
								disabled={option.disabled}
							>
								<span className={css.creationIcon}>
									{option.iconComponent}
								</span>
								<span className={css.creationTitle}>
									{option.title}
								</span>
							</button>
						))}
					</div>
				</OverlaySection>

				{!isInstallDisabledByQueryParam() && (
					<OverlaySection title="Start from a Blueprint">
						{blueprintsLoading ? (
							<div className={css.loadingContainer}>
								<Spinner />
							</div>
						) : blueprintsError ? (
							<p className={css.emptyMessage}>
								Unable to load blueprints. Check your
								connection.
							</p>
						) : (
							<div className={css.blueprintsRow}>
								{previewBlueprints.map((blueprint) => (
									<button
										key={blueprint.path}
										className={css.blueprintPreviewCard}
										onClick={() =>
											previewBlueprint(blueprint.path)
										}
									>
										<div
											className={
												css.blueprintPreviewThumbnail
											}
										>
											{blueprint.screenshot_url ? (
												<img
													src={
														blueprint.screenshot_url
													}
													alt=""
													loading="lazy"
												/>
											) : (
												<div
													className={
														css.blueprintPlaceholder
													}
												>
													<WordPressIcon />
												</div>
											)}
										</div>
										<span
											className={
												css.blueprintPreviewTitle
											}
										>
											{blueprint.title}
										</span>
									</button>
								))}
								<button
									className={css.blueprintPreviewCard}
									onClick={() => setViewMode('blueprints')}
								>
									<div
										className={classNames(
											css.blueprintPreviewThumbnail,
											css.viewAllThumbnail
										)}
									>
										<GridIcon size={50} />
									</div>
									<span className={css.blueprintPreviewTitle}>
										View all {allBlueprints.length}{' '}
										blueprints
									</span>
								</button>
							</div>
						)}
					</OverlaySection>
				)}

				<OverlaySection title="Your Playgrounds">
					<div className={css.sitesList}>
						<div
							className={classNames(css.siteRow, {
								[css.siteRowSelected]:
									temporarySite?.slug === activeSite?.slug,
							})}
						>
							<button
								className={css.siteRowContent}
								onClick={onTemporaryPlaygroundClick}
							>
								<div className={css.siteRowLogo}>
									{temporarySite?.metadata.logo ? (
										<img
											src={getLogoDataURL(
												temporarySite.metadata.logo
											)}
											alt=""
										/>
									) : (
										<WordPressIcon />
									)}
								</div>
								<div className={css.siteRowInfo}>
									<span className={css.siteRowName}>
										Unsaved Playground
									</span>
									<span className={css.siteRowDate}>
										Not saved to browser storage
									</span>
								</div>
							</button>
						</div>
						{storedSites.map((site) => {
							const isSelected = site.slug === activeSite?.slug;
							return (
								<div
									key={site.slug}
									className={classNames(css.siteRow, {
										[css.siteRowSelected]: isSelected,
									})}
								>
									<button
										className={css.siteRowContent}
										onClick={() => onSiteClick(site.slug)}
									>
										<div className={css.siteRowLogo}>
											{site.metadata.logo ? (
												<img
													src={getLogoDataURL(
														site.metadata.logo
													)}
													alt=""
												/>
											) : (
												<WordPressIcon />
											)}
										</div>
										<div className={css.siteRowInfo}>
											<span className={css.siteRowName}>
												{site.metadata.name}
											</span>
											{site.metadata.whenCreated && (
												<span
													className={css.siteRowDate}
												>
													Created{' '}
													{new Date(
														site.metadata
															.whenCreated
													).toLocaleDateString(
														undefined,
														{
															year: 'numeric',
															month: 'short',
															day: 'numeric',
														}
													)}
												</span>
											)}
										</div>
									</button>
									<DropdownMenu
										icon={moreVertical}
										label="Site actions"
										className={css.siteRowMenu}
										popoverProps={{
											placement: 'bottom-end',
										}}
									>
										{({ onClose: closeMenu }) => (
											<>
												<MenuGroup>
													<MenuItem
														onClick={() =>
															handleRenameSite(
																site,
																closeMenu
															)
														}
													>
														Rename
													</MenuItem>
												</MenuGroup>
												<MenuGroup>
													<MenuItem
														className={
															css.dangerMenuItem
														}
														onClick={() =>
															handleDeleteSite(
																site,
																closeMenu
															)
														}
													>
														Delete
													</MenuItem>
												</MenuGroup>
											</>
										)}
									</DropdownMenu>
								</div>
							);
						})}
					</div>
				</OverlaySection>
			</OverlayBody>
		</Overlay>
	);
}
