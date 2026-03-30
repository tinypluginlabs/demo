import React from 'react';
import css from './style.module.css';
import classNames from 'classnames';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
import { useDispatch } from 'react-redux';
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
import * as PlaygroundIcons from '@wp-playground/components';
import { PlaygroundRoute, redirectTo } from '../../lib/state/url/router';
import {
	Overlay,
	OverlayHeader,
	OverlayBody,
	OverlaySection,
} from '../overlay';
import { useFetch } from '../../lib/hooks/use-fetch';
import type { BlueprintsConfig, BlueprintButton } from '../../lib/types/blueprints-config';

interface SavedPlaygroundsOverlayProps {
	onClose: () => void;
}

export function SavedPlaygroundsOverlay({
	onClose,
}: SavedPlaygroundsOverlayProps) {
	const storedSites = useAppSelector(selectSortedSites).filter(
		(site) => site.metadata.storage !== 'none'
	);
	const temporarySite = useAppSelector(selectTemporarySite);
	const activeSite = useActiveSite();
	const dispatch = useAppDispatch();
	const modalDispatch: PlaygroundDispatch = useDispatch();

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

	function createVanillaSite() {
		dispatch(setSiteManagerOpen(false));
		redirectTo(PlaygroundRoute.newTemporarySite());
		onClose();
	}

	// Helper function to resolve icon from string (component name or URL)
	function resolveIcon(iconSpec?: string): React.ReactNode {
		if (!iconSpec) {
			return <WordPressIcon />;
		}

		// Check if it's a URL (SVG from external source)
		if (iconSpec.startsWith('http://') || iconSpec.startsWith('https://')) {
			return (
				<img
					src={iconSpec}
					alt=""
					style={{ width: '100%', height: '100%' }}
				/>
			);
		}

		// Try to resolve as a React component from @wp-playground/components
		const IconComponent = (PlaygroundIcons as any)[iconSpec];
		if (IconComponent && typeof IconComponent === 'function') {
			return <IconComponent />;
		}

		// Fallback to WordPressIcon if component not found
		return <WordPressIcon />;
	}

	// Fetch blueprints configuration from /blueprints/blueprints.json
	const { data: blueprintsConfig } = useFetch<BlueprintsConfig>(
		'/blueprints/blueprints.json'
	);

	// Fallback to hardcoded buttons if JSON fetch fails or is loading
	const defaultCreationOptions: BlueprintButton[] = [
		{
			id: 'tinyrelated',
			title: 'tinyRelated',
			path: '/tinyrelated',
			disabled: false,
		},
		{
			id: 'tinyrating',
			title: 'tinyRating',
			path: '/tinyrating',
			disabled: false,
		},
		{
			id: 'tinyevent',
			title: 'tinyEvent',
			path: '/tinyevent',
			disabled: false,
		},
	];

	// Use fetched config if available, otherwise use defaults
	const buttonsConfig = blueprintsConfig?.buttons || defaultCreationOptions;

	// Transform button configs into creation options with onClick handlers
	const creationOptions = buttonsConfig.map((button) => ({
		id: button.id,
		title: button.title,
		iconComponent: resolveIcon(button.icon),
		onClick: () => {
			window.location.href = button.path;
		},
		disabled: button.disabled ?? false,
	}));

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
