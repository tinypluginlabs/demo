import { LatestSupportedPHPVersion as G, FSHelpers as w, loadPHPRuntime as me, __private__dont__use as F } from "@php-wasm/universal";
import { consumeAPI as gt, exposeAPI as It } from "@php-wasm/universal";
import { concatArrayBuffers as R, concatUint8Arrays as u, Semaphore as ge, joinPaths as ae, basename as Ie } from "@php-wasm/util";
import { logger as U } from "@php-wasm/logger";
import { fetchWithCorsProxy as Ke } from "@php-wasm/web-service-worker";
import { FirewallInterferenceError as Dt, fetchWithCorsProxy as Wt } from "@php-wasm/web-service-worker";
import { createMemoizedFetch as De } from "@wp-playground/common";
import { journalFSEvents as We, normalizeFilesystemOperations as be } from "@php-wasm/fs-journal";
async function Pe(i = G) {
  switch (i) {
    case "8.5":
      return (await import("@php-wasm/web-8-5")).getPHPLoaderModule();
    case "8.4":
      return (await import("@php-wasm/web-8-4")).getPHPLoaderModule();
    case "8.3":
      return (await import("@php-wasm/web-8-3")).getPHPLoaderModule();
    case "8.2":
      return (await import("@php-wasm/web-8-2")).getPHPLoaderModule();
    case "8.1":
      return (await import("@php-wasm/web-8-1")).getPHPLoaderModule();
    case "8.0":
      return (await import("@php-wasm/web-8-0")).getPHPLoaderModule();
    case "7.4":
      return (await import("@php-wasm/web-7-4")).getPHPLoaderModule();
  }
  throw new Error(`Unsupported PHP version ${i}`);
}
function f(i) {
  return Object.fromEntries(Object.entries(i).map(([e, t]) => [t, e]));
}
function K(i) {
  return new Uint8Array([i >> 8 & 255, i & 255]);
}
function L(i) {
  return new Uint8Array([
    i >> 16 & 255,
    i >> 8 & 255,
    i & 255
  ]);
}
function z(i) {
  const e = new ArrayBuffer(8);
  return new DataView(e).setBigUint64(0, BigInt(i), !1), new Uint8Array(e);
}
class m {
  constructor(e) {
    this.offset = 0, this.buffer = e, this.view = new DataView(e);
  }
  readUint8() {
    const e = this.view.getUint8(this.offset);
    return this.offset += 1, e;
  }
  readUint16() {
    const e = this.view.getUint16(this.offset);
    return this.offset += 2, e;
  }
  readUint32() {
    const e = this.view.getUint32(this.offset);
    return this.offset += 4, e;
  }
  readUint8Array(e) {
    const t = this.buffer.slice(this.offset, this.offset + e);
    return this.offset += e, new Uint8Array(t);
  }
  isFinished() {
    return this.offset >= this.buffer.byteLength;
  }
}
class x {
  constructor(e) {
    this.offset = 0, this.buffer = new ArrayBuffer(e), this.uint8Array = new Uint8Array(this.buffer), this.view = new DataView(this.buffer);
  }
  writeUint8(e) {
    this.view.setUint8(this.offset, e), this.offset += 1;
  }
  writeUint16(e) {
    this.view.setUint16(this.offset, e), this.offset += 2;
  }
  writeUint32(e) {
    this.view.setUint32(this.offset, e), this.offset += 4;
  }
  writeUint8Array(e) {
    this.uint8Array.set(e, this.offset), this.offset += e.length;
  }
}
const D = {
  server_name: 0,
  max_fragment_length: 1,
  client_certificate_url: 2,
  trusted_ca_keys: 3,
  truncated_hmac: 4,
  status_request: 5,
  user_mapping: 6,
  client_authz: 7,
  server_authz: 8,
  cert_type: 9,
  supported_groups: 10,
  ec_point_formats: 11,
  srp: 12,
  signature_algorithms: 13,
  use_srtp: 14,
  heartbeat: 15,
  application_layer_protocol_negotiation: 16,
  status_request_v2: 17,
  signed_certificate_timestamp: 18,
  client_certificate_type: 19,
  server_certificate_type: 20,
  padding: 21,
  encrypt_then_mac: 22,
  extended_master_secret: 23,
  token_binding: 24,
  cached_info: 25,
  tls_its: 26,
  compress_certificate: 27,
  record_size_limit: 28,
  pwd_protect: 29,
  pwo_clear: 30,
  password_salt: 31,
  ticket_pinning: 32,
  tls_cert_with_extern_psk: 33,
  delegated_credential: 34,
  session_ticket: 35,
  TLMSP: 36,
  TLMSP_proxying: 37,
  TLMSP_delegate: 38,
  supported_ekt_ciphers: 39,
  pre_shared_key: 41,
  early_data: 42,
  supported_versions: 43,
  cookie: 44,
  psk_key_exchange_modes: 45,
  reserved: 46,
  certificate_authorities: 47,
  oid_filters: 48,
  post_handshake_auth: 49,
  signature_algorithms_cert: 50,
  key_share: 51,
  transparency_info: 52,
  connection_id: 54,
  renegotiation_info: 65281
}, Re = f(D), _e = {
  host_name: 0
}, Be = f(_e);
class oe {
  static decodeFromClient(e) {
    const t = new DataView(e.buffer);
    let n = 0;
    const r = t.getUint16(n);
    n += 2;
    const s = [];
    for (; n < r + 2; ) {
      const a = e[n];
      n += 1;
      const _ = t.getUint16(n);
      n += 2;
      const S = e.slice(n, n + _);
      switch (n += _, a) {
        case _e.host_name:
          s.push({
            name_type: Be[a],
            name: {
              host_name: new TextDecoder().decode(S)
            }
          });
          break;
        default:
          throw new Error(`Unsupported name type ${a}`);
      }
    }
    return { server_name_list: s };
  }
  /**
   * Encode the server_name extension
   *
   * +------------------------------------+
   * | Extension Type (server_name) [2B]  |
   * | 0x00 0x00                          |
   * +------------------------------------+
   * | Extension Length             [2B]  |
   * | 0x00 0x00                          |
   * +------------------------------------+
   */
  static encodeForClient(e) {
    if (e != null && e.server_name_list.length)
      throw new Error(
        "Encoding non-empty lists for ClientHello is not supported yet. Only empty lists meant for ServerHello are supported today."
      );
    const t = new x(4);
    return t.writeUint16(D.server_name), t.writeUint16(0), t.uint8Array;
  }
}
const ce = {
  uncompressed: 0,
  ansiX962_compressed_prime: 1,
  ansiX962_compressed_char2: 2
}, Y = f(ce);
class Se {
  /**
   * +--------------------------------------------------+
   * | Payload Length                            [2B]   |
   * +--------------------------------------------------+
   * | EC Point Formats Length                   [1B]   |
   * +--------------------------------------------------+
   * | EC Point Format 1                         [1B]   |
   * +--------------------------------------------------+
   * | EC Point Format 2                         [1B]   |
   * +--------------------------------------------------+
   * | ...                                              |
   * +--------------------------------------------------+
   * | EC Point Format n                         [1B]   |
   * +--------------------------------------------------+
   */
  static decodeFromClient(e) {
    const t = new m(e.buffer), n = t.readUint8(), r = [];
    for (let s = 0; s < n; s++) {
      const a = t.readUint8();
      a in Y && r.push(Y[a]);
    }
    return r;
  }
  /**
   * Encode the ec_point_formats extension
   *
   * +--------------------------------------------------+
   * | Extension Type (ec_point_formats)         [2B]   |
   * | 0x00 0x0B                                        |
   * +--------------------------------------------------+
   * | Body Length                               [2B]   |
   * +--------------------------------------------------+
   * | EC Point Format Length                    [1B]   |
   * +--------------------------------------------------+
   * | EC Point Format                           [1B]   |
   * +--------------------------------------------------+
   */
  static encodeForClient(e) {
    const t = new x(6);
    return t.writeUint16(D.ec_point_formats), t.writeUint16(2), t.writeUint8(1), t.writeUint8(ce[e]), t.uint8Array;
  }
}
const Ce = {
  decodeFromClient(i) {
    const e = i[0] ?? 0;
    return {
      renegotiatedConnection: i.slice(1, 1 + e)
    };
  },
  /**
   * For an initial connection (not a renegotiation), the server responds
   * with an empty renegotiated_connection field.
   */
  encodeForClient() {
    const i = D.renegotiation_info, e = new Uint8Array([0]);
    return new Uint8Array([
      i >> 8 & 255,
      i & 255,
      0,
      e.length,
      ...e
    ]);
  }
}, le = {
  TLS1_CK_PSK_WITH_RC4_128_SHA: 138,
  TLS1_CK_PSK_WITH_3DES_EDE_CBC_SHA: 139,
  TLS1_CK_PSK_WITH_AES_128_CBC_SHA: 140,
  TLS1_CK_PSK_WITH_AES_256_CBC_SHA: 141,
  TLS1_CK_DHE_PSK_WITH_RC4_128_SHA: 142,
  TLS1_CK_DHE_PSK_WITH_3DES_EDE_CBC_SHA: 143,
  TLS1_CK_DHE_PSK_WITH_AES_128_CBC_SHA: 144,
  TLS1_CK_DHE_PSK_WITH_AES_256_CBC_SHA: 145,
  TLS1_CK_RSA_PSK_WITH_RC4_128_SHA: 146,
  TLS1_CK_RSA_PSK_WITH_3DES_EDE_CBC_SHA: 147,
  TLS1_CK_RSA_PSK_WITH_AES_128_CBC_SHA: 148,
  TLS1_CK_RSA_PSK_WITH_AES_256_CBC_SHA: 149,
  TLS1_CK_PSK_WITH_AES_128_GCM_SHA256: 168,
  TLS1_CK_PSK_WITH_AES_256_GCM_SHA384: 169,
  TLS1_CK_DHE_PSK_WITH_AES_128_GCM_SHA256: 170,
  TLS1_CK_DHE_PSK_WITH_AES_256_GCM_SHA384: 171,
  TLS1_CK_RSA_PSK_WITH_AES_128_GCM_SHA256: 172,
  TLS1_CK_RSA_PSK_WITH_AES_256_GCM_SHA384: 173,
  TLS1_CK_PSK_WITH_AES_128_CBC_SHA256: 174,
  TLS1_CK_PSK_WITH_AES_256_CBC_SHA384: 175,
  TLS1_CK_PSK_WITH_NULL_SHA256: 176,
  TLS1_CK_PSK_WITH_NULL_SHA384: 177,
  TLS1_CK_DHE_PSK_WITH_AES_128_CBC_SHA256: 178,
  TLS1_CK_DHE_PSK_WITH_AES_256_CBC_SHA384: 179,
  TLS1_CK_DHE_PSK_WITH_NULL_SHA256: 180,
  TLS1_CK_DHE_PSK_WITH_NULL_SHA384: 181,
  TLS1_CK_RSA_PSK_WITH_AES_128_CBC_SHA256: 182,
  TLS1_CK_RSA_PSK_WITH_AES_256_CBC_SHA384: 183,
  TLS1_CK_RSA_PSK_WITH_NULL_SHA256: 184,
  TLS1_CK_RSA_PSK_WITH_NULL_SHA384: 185,
  TLS1_CK_PSK_WITH_NULL_SHA: 44,
  TLS1_CK_DHE_PSK_WITH_NULL_SHA: 45,
  TLS1_CK_RSA_PSK_WITH_NULL_SHA: 46,
  TLS1_CK_RSA_WITH_AES_128_SHA: 47,
  TLS1_CK_DH_DSS_WITH_AES_128_SHA: 48,
  TLS1_CK_DH_RSA_WITH_AES_128_SHA: 49,
  TLS1_CK_DHE_DSS_WITH_AES_128_SHA: 50,
  TLS1_CK_DHE_RSA_WITH_AES_128_SHA: 51,
  TLS1_CK_ADH_WITH_AES_128_SHA: 52,
  TLS1_CK_RSA_WITH_AES_256_SHA: 53,
  TLS1_CK_DH_DSS_WITH_AES_256_SHA: 54,
  TLS1_CK_DH_RSA_WITH_AES_256_SHA: 55,
  TLS1_CK_DHE_DSS_WITH_AES_256_SHA: 56,
  TLS1_CK_DHE_RSA_WITH_AES_256_SHA: 57,
  TLS1_CK_ADH_WITH_AES_256_SHA: 58,
  TLS1_CK_RSA_WITH_NULL_SHA256: 59,
  TLS1_CK_RSA_WITH_AES_128_SHA256: 60,
  TLS1_CK_RSA_WITH_AES_256_SHA256: 61,
  TLS1_CK_DH_DSS_WITH_AES_128_SHA256: 62,
  TLS1_CK_DH_RSA_WITH_AES_128_SHA256: 63,
  TLS1_CK_DHE_DSS_WITH_AES_128_SHA256: 64,
  TLS1_CK_RSA_WITH_CAMELLIA_128_CBC_SHA: 65,
  TLS1_CK_DH_DSS_WITH_CAMELLIA_128_CBC_SHA: 66,
  TLS1_CK_DH_RSA_WITH_CAMELLIA_128_CBC_SHA: 67,
  TLS1_CK_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA: 68,
  TLS1_CK_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA: 69,
  TLS1_CK_ADH_WITH_CAMELLIA_128_CBC_SHA: 70,
  TLS1_CK_DHE_RSA_WITH_AES_128_SHA256: 103,
  TLS1_CK_DH_DSS_WITH_AES_256_SHA256: 104,
  TLS1_CK_DH_RSA_WITH_AES_256_SHA256: 105,
  TLS1_CK_DHE_DSS_WITH_AES_256_SHA256: 106,
  TLS1_CK_DHE_RSA_WITH_AES_256_SHA256: 107,
  TLS1_CK_ADH_WITH_AES_128_SHA256: 108,
  TLS1_CK_ADH_WITH_AES_256_SHA256: 109,
  TLS1_CK_RSA_WITH_CAMELLIA_256_CBC_SHA: 132,
  TLS1_CK_DH_DSS_WITH_CAMELLIA_256_CBC_SHA: 133,
  TLS1_CK_DH_RSA_WITH_CAMELLIA_256_CBC_SHA: 134,
  TLS1_CK_DHE_DSS_WITH_CAMELLIA_256_CBC_SHA: 135,
  TLS1_CK_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA: 136,
  TLS1_CK_ADH_WITH_CAMELLIA_256_CBC_SHA: 137,
  TLS1_CK_RSA_WITH_SEED_SHA: 150,
  TLS1_CK_DH_DSS_WITH_SEED_SHA: 151,
  TLS1_CK_DH_RSA_WITH_SEED_SHA: 152,
  TLS1_CK_DHE_DSS_WITH_SEED_SHA: 153,
  TLS1_CK_DHE_RSA_WITH_SEED_SHA: 154,
  TLS1_CK_ADH_WITH_SEED_SHA: 155,
  TLS1_CK_RSA_WITH_AES_128_GCM_SHA256: 156,
  TLS1_CK_RSA_WITH_AES_256_GCM_SHA384: 157,
  TLS1_CK_DHE_RSA_WITH_AES_128_GCM_SHA256: 158,
  TLS1_CK_DHE_RSA_WITH_AES_256_GCM_SHA384: 159,
  TLS1_CK_DH_RSA_WITH_AES_128_GCM_SHA256: 160,
  TLS1_CK_DH_RSA_WITH_AES_256_GCM_SHA384: 161,
  TLS1_CK_DHE_DSS_WITH_AES_128_GCM_SHA256: 162,
  TLS1_CK_DHE_DSS_WITH_AES_256_GCM_SHA384: 163,
  TLS1_CK_DH_DSS_WITH_AES_128_GCM_SHA256: 164,
  TLS1_CK_DH_DSS_WITH_AES_256_GCM_SHA384: 165,
  TLS1_CK_ADH_WITH_AES_128_GCM_SHA256: 166,
  TLS1_CK_ADH_WITH_AES_256_GCM_SHA384: 167,
  TLS1_CK_RSA_WITH_AES_128_CCM: 49308,
  TLS1_CK_RSA_WITH_AES_256_CCM: 49309,
  TLS1_CK_DHE_RSA_WITH_AES_128_CCM: 49310,
  TLS1_CK_DHE_RSA_WITH_AES_256_CCM: 49311,
  TLS1_CK_RSA_WITH_AES_128_CCM_8: 49312,
  TLS1_CK_RSA_WITH_AES_256_CCM_8: 49313,
  TLS1_CK_DHE_RSA_WITH_AES_128_CCM_8: 49314,
  TLS1_CK_DHE_RSA_WITH_AES_256_CCM_8: 49315,
  TLS1_CK_PSK_WITH_AES_128_CCM: 49316,
  TLS1_CK_PSK_WITH_AES_256_CCM: 49317,
  TLS1_CK_DHE_PSK_WITH_AES_128_CCM: 49318,
  TLS1_CK_DHE_PSK_WITH_AES_256_CCM: 49319,
  TLS1_CK_PSK_WITH_AES_128_CCM_8: 49320,
  TLS1_CK_PSK_WITH_AES_256_CCM_8: 49321,
  TLS1_CK_DHE_PSK_WITH_AES_128_CCM_8: 49322,
  TLS1_CK_DHE_PSK_WITH_AES_256_CCM_8: 49323,
  TLS1_CK_ECDHE_ECDSA_WITH_AES_128_CCM: 49324,
  TLS1_CK_ECDHE_ECDSA_WITH_AES_256_CCM: 49325,
  TLS1_CK_ECDHE_ECDSA_WITH_AES_128_CCM_8: 49326,
  TLS1_CK_ECDHE_ECDSA_WITH_AES_256_CCM_8: 49327,
  TLS1_CK_RSA_WITH_CAMELLIA_128_CBC_SHA256: 186,
  TLS1_CK_DH_DSS_WITH_CAMELLIA_128_CBC_SHA256: 187,
  TLS1_CK_DH_RSA_WITH_CAMELLIA_128_CBC_SHA256: 188,
  TLS1_CK_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA256: 189,
  TLS1_CK_DHE_RSA_WITH_CAMELLIA_128_CBC_SHA256: 190,
  TLS1_CK_ADH_WITH_CAMELLIA_128_CBC_SHA256: 191,
  TLS1_CK_RSA_WITH_CAMELLIA_256_CBC_SHA256: 192,
  TLS1_CK_DH_DSS_WITH_CAMELLIA_256_CBC_SHA256: 193,
  TLS1_CK_DH_RSA_WITH_CAMELLIA_256_CBC_SHA256: 194,
  TLS1_CK_DHE_DSS_WITH_CAMELLIA_256_CBC_SHA256: 195,
  TLS1_CK_DHE_RSA_WITH_CAMELLIA_256_CBC_SHA256: 196,
  TLS1_CK_ADH_WITH_CAMELLIA_256_CBC_SHA256: 197,
  TLS1_CK_ECDH_ECDSA_WITH_NULL_SHA: 49153,
  TLS1_CK_ECDH_ECDSA_WITH_RC4_128_SHA: 49154,
  TLS1_CK_ECDH_ECDSA_WITH_DES_192_CBC3_SHA: 49155,
  TLS1_CK_ECDH_ECDSA_WITH_AES_128_CBC_SHA: 49156,
  TLS1_CK_ECDH_ECDSA_WITH_AES_256_CBC_SHA: 49157,
  TLS1_CK_ECDHE_ECDSA_WITH_NULL_SHA: 49158,
  TLS1_CK_ECDHE_ECDSA_WITH_RC4_128_SHA: 49159,
  TLS1_CK_ECDHE_ECDSA_WITH_DES_192_CBC3_SHA: 49160,
  TLS1_CK_ECDHE_ECDSA_WITH_AES_128_CBC_SHA: 49161,
  TLS1_CK_ECDHE_ECDSA_WITH_AES_256_CBC_SHA: 49162,
  TLS1_CK_ECDH_RSA_WITH_NULL_SHA: 49163,
  TLS1_CK_ECDH_RSA_WITH_RC4_128_SHA: 49164,
  TLS1_CK_ECDH_RSA_WITH_DES_192_CBC3_SHA: 49165,
  TLS1_CK_ECDH_RSA_WITH_AES_128_CBC_SHA: 49166,
  TLS1_CK_ECDH_RSA_WITH_AES_256_CBC_SHA: 49167,
  TLS1_CK_ECDHE_RSA_WITH_NULL_SHA: 49168,
  TLS1_CK_ECDHE_RSA_WITH_RC4_128_SHA: 49169,
  TLS1_CK_ECDHE_RSA_WITH_DES_192_CBC3_SHA: 49170,
  TLS1_CK_ECDHE_RSA_WITH_AES_128_CBC_SHA: 49171,
  TLS1_CK_ECDHE_RSA_WITH_AES_256_CBC_SHA: 49172,
  TLS1_CK_ECDH_anon_WITH_NULL_SHA: 49173,
  TLS1_CK_ECDH_anon_WITH_RC4_128_SHA: 49174,
  TLS1_CK_ECDH_anon_WITH_DES_192_CBC3_SHA: 49175,
  TLS1_CK_ECDH_anon_WITH_AES_128_CBC_SHA: 49176,
  TLS1_CK_ECDH_anon_WITH_AES_256_CBC_SHA: 49177,
  TLS1_CK_SRP_SHA_WITH_3DES_EDE_CBC_SHA: 49178,
  TLS1_CK_SRP_SHA_RSA_WITH_3DES_EDE_CBC_SHA: 49179,
  TLS1_CK_SRP_SHA_DSS_WITH_3DES_EDE_CBC_SHA: 49180,
  TLS1_CK_SRP_SHA_WITH_AES_128_CBC_SHA: 49181,
  TLS1_CK_SRP_SHA_RSA_WITH_AES_128_CBC_SHA: 49182,
  TLS1_CK_SRP_SHA_DSS_WITH_AES_128_CBC_SHA: 49183,
  TLS1_CK_SRP_SHA_WITH_AES_256_CBC_SHA: 49184,
  TLS1_CK_SRP_SHA_RSA_WITH_AES_256_CBC_SHA: 49185,
  TLS1_CK_SRP_SHA_DSS_WITH_AES_256_CBC_SHA: 49186,
  TLS1_CK_ECDHE_ECDSA_WITH_AES_128_SHA256: 49187,
  TLS1_CK_ECDHE_ECDSA_WITH_AES_256_SHA384: 49188,
  TLS1_CK_ECDH_ECDSA_WITH_AES_128_SHA256: 49189,
  TLS1_CK_ECDH_ECDSA_WITH_AES_256_SHA384: 49190,
  TLS1_CK_ECDHE_RSA_WITH_AES_128_SHA256: 49191,
  TLS1_CK_ECDHE_RSA_WITH_AES_256_SHA384: 49192,
  TLS1_CK_ECDH_RSA_WITH_AES_128_SHA256: 49193,
  TLS1_CK_ECDH_RSA_WITH_AES_256_SHA384: 49194,
  TLS1_CK_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256: 49195,
  TLS1_CK_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384: 49196,
  TLS1_CK_ECDH_ECDSA_WITH_AES_128_GCM_SHA256: 49197,
  TLS1_CK_ECDH_ECDSA_WITH_AES_256_GCM_SHA384: 49198,
  TLS1_CK_ECDHE_RSA_WITH_AES_128_GCM_SHA256: 49199,
  TLS1_CK_ECDHE_RSA_WITH_AES_256_GCM_SHA384: 49200,
  TLS1_CK_ECDH_RSA_WITH_AES_128_GCM_SHA256: 49201,
  TLS1_CK_ECDH_RSA_WITH_AES_256_GCM_SHA384: 49202,
  TLS1_CK_ECDHE_PSK_WITH_RC4_128_SHA: 49203,
  TLS1_CK_ECDHE_PSK_WITH_3DES_EDE_CBC_SHA: 49204,
  TLS1_CK_ECDHE_PSK_WITH_AES_128_CBC_SHA: 49205,
  TLS1_CK_ECDHE_PSK_WITH_AES_256_CBC_SHA: 49206,
  TLS1_CK_ECDHE_PSK_WITH_AES_128_CBC_SHA256: 49207,
  TLS1_CK_ECDHE_PSK_WITH_AES_256_CBC_SHA384: 49208,
  TLS1_CK_ECDHE_PSK_WITH_NULL_SHA: 49209,
  TLS1_CK_ECDHE_PSK_WITH_NULL_SHA256: 49210,
  TLS1_CK_ECDHE_PSK_WITH_NULL_SHA384: 49211,
  TLS1_CK_ECDHE_ECDSA_WITH_CAMELLIA_128_CBC_SHA256: 49266,
  TLS1_CK_ECDHE_ECDSA_WITH_CAMELLIA_256_CBC_SHA384: 49267,
  TLS1_CK_ECDH_ECDSA_WITH_CAMELLIA_128_CBC_SHA256: 49268,
  TLS1_CK_ECDH_ECDSA_WITH_CAMELLIA_256_CBC_SHA384: 49269,
  TLS1_CK_ECDHE_RSA_WITH_CAMELLIA_128_CBC_SHA256: 49270,
  TLS1_CK_ECDHE_RSA_WITH_CAMELLIA_256_CBC_SHA384: 49271,
  TLS1_CK_ECDH_RSA_WITH_CAMELLIA_128_CBC_SHA256: 49272,
  TLS1_CK_ECDH_RSA_WITH_CAMELLIA_256_CBC_SHA384: 49273,
  TLS1_CK_PSK_WITH_CAMELLIA_128_CBC_SHA256: 49300,
  TLS1_CK_PSK_WITH_CAMELLIA_256_CBC_SHA384: 49301,
  TLS1_CK_DHE_PSK_WITH_CAMELLIA_128_CBC_SHA256: 49302,
  TLS1_CK_DHE_PSK_WITH_CAMELLIA_256_CBC_SHA384: 49303,
  TLS1_CK_RSA_PSK_WITH_CAMELLIA_128_CBC_SHA256: 49304,
  TLS1_CK_RSA_PSK_WITH_CAMELLIA_256_CBC_SHA384: 49305,
  TLS1_CK_ECDHE_PSK_WITH_CAMELLIA_128_CBC_SHA256: 49306,
  TLS1_CK_ECDHE_PSK_WITH_CAMELLIA_256_CBC_SHA384: 49307,
  TLS1_CK_ECDHE_RSA_WITH_CHACHA20_POLY1305: 52392,
  TLS1_CK_ECDHE_ECDSA_WITH_CHACHA20_POLY1305: 52393,
  TLS1_CK_DHE_RSA_WITH_CHACHA20_POLY1305: 52394,
  TLS1_CK_PSK_WITH_CHACHA20_POLY1305: 52395,
  TLS1_CK_ECDHE_PSK_WITH_CHACHA20_POLY1305: 52396,
  TLS1_CK_DHE_PSK_WITH_CHACHA20_POLY1305: 52397,
  TLS1_CK_RSA_PSK_WITH_CHACHA20_POLY1305: 52398
}, Z = f(le), he = {
  secp256r1: 23,
  secp384r1: 24,
  secp521r1: 25,
  x25519: 29,
  x448: 30
}, J = f(he);
class Ue {
  /**
   * +--------------------------------------------------+
   * | Payload Length                            [2B]   |
   * +--------------------------------------------------+
   * | Supported Groups List Length              [2B]   |
   * +--------------------------------------------------+
   * | Supported Group 1                         [2B]   |
   * +--------------------------------------------------+
   * | Supported Group 2                         [2B]   |
   * +--------------------------------------------------+
   * | ...                                              |
   * +--------------------------------------------------+
   * | Supported Group n                         [2B]   |
   * +--------------------------------------------------+
   */
  static decodeFromClient(e) {
    const t = new m(e.buffer);
    t.readUint16();
    const n = [];
    for (; !t.isFinished(); ) {
      const r = t.readUint16();
      r in J && n.push(J[r]);
    }
    return n;
  }
  /**
   * +--------------------------------------------------+
   * | Extension Type (supported_groups)         [2B]   |
   * | 0x00 0x0A                                        |
   * +--------------------------------------------------+
   * | Extension Length                          [2B]   |
   * +--------------------------------------------------+
   * | Selected Group                            [2B]   |
   * +--------------------------------------------------+
   */
  static encodeForClient(e) {
    const t = new x(6);
    return t.writeUint16(D.supported_groups), t.writeUint16(2), t.writeUint16(he[e]), t.uint8Array;
  }
}
const $ = {
  anonymous: 0,
  rsa: 1,
  dsa: 2,
  ecdsa: 3
}, X = f($), V = {
  none: 0,
  md5: 1,
  sha1: 2,
  sha224: 3,
  sha256: 4,
  sha384: 5,
  sha512: 6
}, Q = f(V);
class xe {
  /**
   * Binary layout:
   *
   * +------------------------------------+
   * | Payload Length              [2B]   |
   * +------------------------------------+
   * | Hash Algorithm 1            [1B]   |
   * | Signature Algorithm 1       [1B]   |
   * +------------------------------------+
   * | Hash Algorithm 2            [1B]   |
   * | Signature Algorithm 2       [1B]   |
   * +------------------------------------+
   * | ...                                |
   * +------------------------------------+
   */
  static decodeFromClient(e) {
    const t = new m(e.buffer);
    t.readUint16();
    const n = [];
    for (; !t.isFinished(); ) {
      const r = t.readUint8(), s = t.readUint8();
      if (X[s]) {
        if (!Q[r]) {
          U.warn(`Unknown hash algorithm: ${r}`);
          continue;
        }
        n.push({
          algorithm: X[s],
          hash: Q[r]
        });
      }
    }
    return n;
  }
  /**
   * +--------------------------------------------------+
   * | Extension Type (signature_algorithms)     [2B]   |
   * | 0x00 0x0D                                        |
   * +--------------------------------------------------+
   * | Body Length                               [2B]   |
   * +--------------------------------------------------+
   * | Hash Algorithm                            [1B]   |
   * | Signature Algorithm                       [1B]   |
   * +--------------------------------------------------+
   */
  static encodeforClient(e, t) {
    const n = new x(6);
    return n.writeUint16(D.signature_algorithms), n.writeUint16(2), n.writeUint8(V[e]), n.writeUint8($[t]), n.uint8Array;
  }
}
const ee = {
  server_name: oe,
  signature_algorithms: xe,
  supported_groups: Ue,
  ec_point_formats: Se,
  renegotiation_info: Ce
};
function Me(i) {
  const e = new m(i.buffer), t = [];
  for (; !e.isFinished(); ) {
    const n = e.offset, r = e.readUint16(), s = Re[r], a = e.readUint16(), _ = e.readUint8Array(a);
    if (!(s in ee))
      continue;
    const S = ee[s];
    t.push({
      type: s,
      data: S.decodeFromClient(_),
      raw: i.slice(n, n + 4 + a)
    });
  }
  return t;
}
async function O(i, e, t, n) {
  const r = R([e, t]), s = await crypto.subtle.importKey(
    "raw",
    i,
    { name: "HMAC", hash: { name: "SHA-256" } },
    !1,
    ["sign"]
  );
  let a = r;
  const _ = [];
  for (; R(_).byteLength < n; ) {
    a = await te(s, a);
    const c = R([a, r]), C = await te(s, c);
    _.push(C);
  }
  return R(_).slice(0, n);
}
async function te(i, e) {
  return await crypto.subtle.sign(
    { name: "HMAC", hash: "SHA-256" },
    i,
    e
  );
}
const ve = {
  Null: 0
}, Ae = {
  Warning: 1,
  Fatal: 2
}, ue = f(Ae), He = {
  CloseNotify: 0,
  UnexpectedMessage: 10,
  BadRecordMac: 20,
  DecryptionFailed: 21,
  RecordOverflow: 22,
  DecompressionFailure: 30,
  HandshakeFailure: 40,
  NoCertificate: 41,
  BadCertificate: 42,
  UnsupportedCertificate: 43,
  CertificateRevoked: 44,
  CertificateExpired: 45,
  CertificateUnknown: 46,
  IllegalParameter: 47,
  UnknownCa: 48,
  AccessDenied: 49,
  DecodeError: 50,
  DecryptError: 51,
  ExportRestriction: 60,
  ProtocolVersion: 70,
  InsufficientSecurity: 71,
  InternalError: 80,
  UserCanceled: 90,
  NoRenegotiation: 100,
  UnsupportedExtension: 110
}, de = f(He), l = {
  ChangeCipherSpec: 20,
  Alert: 21,
  Handshake: 22,
  ApplicationData: 23
}, E = {
  HelloRequest: 0,
  ClientHello: 1,
  ServerHello: 2,
  Certificate: 11,
  ServerKeyExchange: 12,
  ServerHelloDone: 14,
  ClientKeyExchange: 16,
  Finished: 20
}, Ne = {
  /**
   * Indicates that a named curve is used.  This option
   * SHOULD be used when applicable.
   */
  NamedCurve: 3
  /**
   * Values 248 through 255 are reserved for private use.
   */
}, ke = {
  secp256r1: 23
};
class q extends Error {
}
const B = new Uint8Array([3, 3]), Fe = crypto.subtle.generateKey(
  {
    name: "ECDH",
    namedCurve: "P-256"
    // Use secp256r1 curve
  },
  !0,
  // Extractable
  ["deriveKey", "deriveBits"]
  // Key usage
);
class qe {
  constructor() {
    this.receivedRecordSequenceNumber = 0, this.sentRecordSequenceNumber = 0, this.closed = !1, this.receivedBytesBuffer = new Uint8Array(), this.receivedTLSRecords = [], this.partialTLSMessages = {}, this.handshakeMessages = [], this.MAX_CHUNK_SIZE = 1024 * 16, this.clientEnd = {
      // We don't need to chunk the encrypted data.
      // OpenSSL already done that for us.
      upstream: new TransformStream(),
      downstream: new TransformStream()
    }, this.clientDownstreamWriter = this.clientEnd.downstream.writable.getWriter(), this.clientUpstreamReader = this.clientEnd.upstream.readable.getReader(), this.serverEnd = {
      upstream: new TransformStream(),
      /**
       * Chunk the data before encrypting it. The
       * TLS1_CK_ECDHE_RSA_WITH_AES_128_GCM_SHA256 cipher suite
       * only supports up to 16KB of data per record.
       *
       * This will spread some messages across multiple records,
       * but TLS supports it so that's fine.
       */
      downstream: Oe(this.MAX_CHUNK_SIZE)
    }, this.serverUpstreamWriter = this.serverEnd.upstream.writable.getWriter();
    const e = this;
    this.serverEnd.downstream.readable.pipeTo(
      new WritableStream({
        async write(t) {
          await e.writeTLSRecord(
            l.ApplicationData,
            t
          );
        },
        async abort(t) {
          e.clientDownstreamWriter.releaseLock(), e.clientEnd.downstream.writable.abort(t), e.close();
        },
        close() {
          e.close();
        }
      })
    ).catch(() => {
    });
  }
  /**
   * Marks this connections as closed and closes all the associated
   * streams.
   */
  async close() {
    if (!this.closed) {
      this.closed = !0;
      try {
        await this.clientDownstreamWriter.close();
      } catch {
      }
      try {
        await this.clientUpstreamReader.cancel();
      } catch {
      }
      try {
        await this.serverUpstreamWriter.close();
      } catch {
      }
      try {
        await this.clientEnd.upstream.readable.cancel();
      } catch {
      }
      try {
        await this.clientEnd.downstream.writable.close();
      } catch {
      }
    }
  }
  /**
   * TLS handshake as per RFC 5246.
   *
   * https://datatracker.ietf.org/doc/html/rfc5246#section-7.4
   */
  async TLSHandshake(e, t) {
    const n = await this.readNextHandshakeMessage(
      E.ClientHello
    );
    if (!n.body.cipher_suites.length)
      throw new Error(
        "Client did not propose any supported cipher suites."
      );
    const r = crypto.getRandomValues(new Uint8Array(32));
    await this.writeTLSRecord(
      l.Handshake,
      I.serverHello(
        n.body,
        r,
        ve.Null
      )
    ), await this.writeTLSRecord(
      l.Handshake,
      I.certificate(t)
    );
    const s = await Fe, a = n.body.random, _ = await I.ECDHEServerKeyExchange(
      a,
      r,
      s,
      e
    );
    await this.writeTLSRecord(l.Handshake, _), await this.writeTLSRecord(
      l.Handshake,
      I.serverHelloDone()
    );
    const S = await this.readNextHandshakeMessage(
      E.ClientKeyExchange
    );
    await this.readNextMessage(l.ChangeCipherSpec), this.sessionKeys = await this.deriveSessionKeys({
      clientRandom: a,
      serverRandom: r,
      serverPrivateKey: s.privateKey,
      clientPublicKey: await crypto.subtle.importKey(
        "raw",
        S.body.exchange_keys,
        { name: "ECDH", namedCurve: "P-256" },
        !1,
        []
      )
    }), await this.readNextHandshakeMessage(E.Finished), await this.writeTLSRecord(
      l.ChangeCipherSpec,
      I.changeCipherSpec()
    ), await this.writeTLSRecord(
      l.Handshake,
      await I.createFinishedMessage(
        this.handshakeMessages,
        this.sessionKeys.masterSecret
      )
    ), this.handshakeMessages = [], this.pollForClientMessages();
  }
  /**
   * Derives the session keys from the random values and the
   * pre-master secret – as per RFC 5246.
   */
  async deriveSessionKeys({
    clientRandom: e,
    serverRandom: t,
    serverPrivateKey: n,
    clientPublicKey: r
  }) {
    const s = await crypto.subtle.deriveBits(
      {
        name: "ECDH",
        public: r
      },
      n,
      256
      // Length of the derived secret (256 bits for P-256)
    ), a = new Uint8Array(
      await O(
        s,
        new TextEncoder().encode("master secret"),
        u([e, t]),
        48
      )
    ), _ = await O(
      a,
      new TextEncoder().encode("key expansion"),
      u([t, e]),
      // Client key, server key, client IV, server IV
      40
    ), S = new m(_), c = S.readUint8Array(16), C = S.readUint8Array(16), h = S.readUint8Array(4), A = S.readUint8Array(4);
    return {
      masterSecret: a,
      clientWriteKey: await crypto.subtle.importKey(
        "raw",
        c,
        { name: "AES-GCM" },
        !1,
        ["encrypt", "decrypt"]
      ),
      serverWriteKey: await crypto.subtle.importKey(
        "raw",
        C,
        { name: "AES-GCM" },
        !1,
        ["encrypt", "decrypt"]
      ),
      clientIV: h,
      serverIV: A
    };
  }
  async readNextHandshakeMessage(e) {
    const t = await this.readNextMessage(l.Handshake);
    if (t.msg_type !== e)
      throw new Error(`Expected ${e} message`);
    return t;
  }
  async readNextMessage(e) {
    let t, n = !1;
    do
      t = await this.readNextTLSRecord(e), n = await this.accumulateUntilMessageIsComplete(t);
    while (n === !1);
    const r = T.TLSMessage(
      t.type,
      n
    );
    return t.type === l.Handshake && this.handshakeMessages.push(t.fragment), r;
  }
  async readNextTLSRecord(e) {
    for (; ; ) {
      for (let _ = 0; _ < this.receivedTLSRecords.length; _++) {
        const S = this.receivedTLSRecords[_];
        if (S.type === e)
          return this.receivedTLSRecords.splice(_, 1), S;
      }
      const t = await this.pollBytes(5), n = t[3] << 8 | t[4], r = t[0], s = await this.pollBytes(n), a = {
        type: r,
        version: {
          major: t[1],
          minor: t[2]
        },
        length: n,
        fragment: this.sessionKeys && r !== l.ChangeCipherSpec ? await this.decryptData(r, s) : s
      };
      if (a.type === l.Alert) {
        const _ = a.fragment[0], S = a.fragment[1], c = ue[_], C = de[S];
        throw _ === Ae.Warning && S === He.CloseNotify ? new q(
          "TLS connection closed by peer (CloseNotify)"
        ) : new Error(
          `TLS alert received: ${c} ${C}`
        );
      }
      this.receivedTLSRecords.push(a);
    }
  }
  /**
   * Returns the requested number of bytes from the client.
   * Waits for the bytes to arrive if necessary.
   */
  async pollBytes(e) {
    for (; this.receivedBytesBuffer.length < e; ) {
      const { value: n, done: r } = await this.clientUpstreamReader.read();
      if (r)
        throw await this.close(), new q("TLS connection closed");
      if (this.receivedBytesBuffer = u([
        this.receivedBytesBuffer,
        n
      ]), this.receivedBytesBuffer.length >= e)
        break;
      await new Promise((s) => setTimeout(s, 100));
    }
    const t = this.receivedBytesBuffer.slice(0, e);
    return this.receivedBytesBuffer = this.receivedBytesBuffer.slice(e), t;
  }
  /**
   * Listens for all incoming messages and passes them to the
   * server handler.
   */
  async pollForClientMessages() {
    try {
      for (; ; ) {
        const e = await this.readNextMessage(
          l.ApplicationData
        );
        this.serverUpstreamWriter.write(e.body);
      }
    } catch (e) {
      if (e instanceof q)
        return;
      throw e;
    }
  }
  /**
   * Decrypts data in a TLS 1.2-compliant manner using
   * the AES-GCM algorithm.
   */
  async decryptData(e, t) {
    const n = this.sessionKeys.clientIV, r = t.slice(0, 8), s = new Uint8Array([...n, ...r]), a = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: s,
        additionalData: new Uint8Array([
          ...z(this.receivedRecordSequenceNumber),
          e,
          ...B,
          // Payload length without IV and tag
          ...K(t.length - 8 - 16)
        ]),
        tagLength: 128
      },
      this.sessionKeys.clientWriteKey,
      // Payload without the explicit IV
      t.slice(8)
    );
    return ++this.receivedRecordSequenceNumber, new Uint8Array(a);
  }
  async accumulateUntilMessageIsComplete(e) {
    this.partialTLSMessages[e.type] = u([
      this.partialTLSMessages[e.type] || new Uint8Array(),
      e.fragment
    ]);
    const t = this.partialTLSMessages[e.type];
    switch (e.type) {
      case l.Handshake: {
        if (t.length < 4)
          return !1;
        const n = t[1] << 8 | t[2];
        if (t.length < 3 + n)
          return !1;
        break;
      }
      case l.Alert: {
        if (t.length < 2)
          return !1;
        break;
      }
      case l.ChangeCipherSpec:
      case l.ApplicationData:
        break;
      default:
        throw new Error(`TLS: Unsupported record type ${e.type}`);
    }
    return delete this.partialTLSMessages[e.type], t;
  }
  /**
   * Passes a TLS record to the client.
   *
   * Accepts unencrypted data and ensures it gets encrypted
   * if needed before sending it to the client. The encryption
   * only kicks in after the handshake is complete.
   */
  async writeTLSRecord(e, t) {
    e === l.Handshake && this.handshakeMessages.push(t), this.sessionKeys && e !== l.ChangeCipherSpec && (t = await this.encryptData(e, t));
    const n = B, r = t.length, s = new Uint8Array(5);
    s[0] = e, s[1] = n[0], s[2] = n[1], s[3] = r >> 8 & 255, s[4] = r & 255;
    const a = u([s, t]);
    this.clientDownstreamWriter.write(a);
  }
  /**
   * Encrypts data in a TLS 1.2-compliant manner using
   * the AES-GCM algorithm.
   */
  async encryptData(e, t) {
    const n = this.sessionKeys.serverIV, r = crypto.getRandomValues(new Uint8Array(8)), s = new Uint8Array([...n, ...r]), a = new Uint8Array([
      ...z(this.sentRecordSequenceNumber),
      e,
      ...B,
      // Payload length without IV and tag
      ...K(t.length)
    ]), _ = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: s,
        additionalData: a,
        tagLength: 128
      },
      this.sessionKeys.serverWriteKey,
      t
    );
    return ++this.sentRecordSequenceNumber, u([
      r,
      new Uint8Array(_)
    ]);
  }
}
class T {
  static TLSMessage(e, t) {
    switch (e) {
      case l.Handshake:
        return T.clientHandshake(t);
      case l.Alert:
        return T.alert(t);
      case l.ChangeCipherSpec:
        return T.changeCipherSpec();
      case l.ApplicationData:
        return T.applicationData(t);
      default:
        throw new Error(`TLS: Unsupported TLS record type ${e}`);
    }
  }
  /**
   * Parses the cipher suites from the server hello message.
   *
   * The cipher suites are encoded as a list of 2-byte values.
   *
   * Binary layout:
   *
   * +----------------------------+
   * | Cipher Suites Length       |  2 bytes
   * +----------------------------+
   * | Cipher Suite 1             |  2 bytes
   * +----------------------------+
   * | Cipher Suite 2             |  2 bytes
   * +----------------------------+
   * | ...                        |
   * +----------------------------+
   * | Cipher Suite n             |  2 bytes
   * +----------------------------+
   *
   * The full list of supported cipher suites values is available at:
   *
   * https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml#tls-parameters-4
   */
  static parseCipherSuites(e) {
    const t = new m(e);
    t.readUint16();
    const n = [];
    for (; !t.isFinished(); ) {
      const r = t.readUint16();
      r in Z && n.push(Z[r]);
    }
    return n;
  }
  static applicationData(e) {
    return {
      type: l.ApplicationData,
      body: e
    };
  }
  static changeCipherSpec() {
    return {
      type: l.ChangeCipherSpec,
      body: new Uint8Array()
    };
  }
  static alert(e) {
    return {
      type: l.Alert,
      level: ue[e[0]],
      description: de[e[1]]
    };
  }
  static clientHandshake(e) {
    const t = e[0], n = e[1] << 16 | e[2] << 8 | e[3], r = e.slice(4);
    let s;
    switch (t) {
      case E.HelloRequest:
        s = T.clientHelloRequestPayload();
        break;
      case E.ClientHello:
        s = T.clientHelloPayload(r);
        break;
      case E.ClientKeyExchange:
        s = T.clientKeyExchangePayload(r);
        break;
      case E.Finished:
        s = T.clientFinishedPayload(r);
        break;
      default:
        throw new Error(`Invalid handshake type ${t}`);
    }
    return {
      type: l.Handshake,
      msg_type: t,
      length: n,
      body: s
    };
  }
  static clientHelloRequestPayload() {
    return {};
  }
  /**
   *	Offset  Size    Field
   *	(bytes) (bytes)
   *	+------+------+---------------------------+
   *	| 0000 |  1   | Handshake Type (1 = ClientHello)
   *	+------+------+---------------------------+
   *	| 0001 |  3   | Length of ClientHello
   *	+------+------+---------------------------+
   *	| 0004 |  2   | Protocol Version
   *	+------+------+---------------------------+
   *	| 0006 |  32  | Client Random
   *	|      |      | (4 bytes timestamp +
   *	|      |      |  28 bytes random)
   *	+------+------+---------------------------+
   *	| 0038 |  1   | Session ID Length
   *	+------+------+---------------------------+
   *	| 0039 |  0+  | Session ID (variable)
   *	|      |      | (0-32 bytes)
   *	+------+------+---------------------------+
   *	| 003A*|  2   | Cipher Suites Length
   *	+------+------+---------------------------+
   *	| 003C*|  2+  | Cipher Suites
   *	|      |      | (2 bytes each)
   *	+------+------+---------------------------+
   *	| xxxx |  1   | Compression Methods Length
   *	+------+------+---------------------------+
   *	| xxxx |  1+  | Compression Methods
   *	|      |      | (1 byte each)
   *	+------+------+---------------------------+
   *	| xxxx |  2   | Extensions Length
   *	+------+------+---------------------------+
   *	| xxxx |  2   | Extension Type
   *	+------+------+---------------------------+
   *	| xxxx |  2   | Extension Length
   *	+------+------+---------------------------+
   *	| xxxx |  v   | Extension Data
   *	+------+------+---------------------------+
   *	|      |      | (Additional extensions...)
   *	+------+------+---------------------------+
   */
  static clientHelloPayload(e) {
    const t = new m(e.buffer), n = {
      client_version: t.readUint8Array(2),
      /**
       * Technically this consists of a GMT timestamp
       * and 28 random bytes, but we don't need to
       * parse this further.
       */
      random: t.readUint8Array(32)
    }, r = t.readUint8();
    n.session_id = t.readUint8Array(r);
    const s = t.readUint16();
    n.cipher_suites = T.parseCipherSuites(
      t.readUint8Array(s).buffer
    );
    const a = t.readUint8();
    n.compression_methods = t.readUint8Array(
      a
    );
    const _ = t.readUint16();
    return n.extensions = Me(
      t.readUint8Array(_)
    ), n;
  }
  /**
   * Binary layout:
   *
   *	+------------------------------------+
   *	| ECDH Client Public Key Length [1B] |
   *	+------------------------------------+
   *	| ECDH Client Public Key   [variable]|
   *	+------------------------------------+
   */
  static clientKeyExchangePayload(e) {
    return {
      // Skip the first byte, which is the length of the public key
      exchange_keys: e.slice(1, e.length)
    };
  }
  static clientFinishedPayload(e) {
    return {
      verify_data: e
    };
  }
}
function Oe(i) {
  return new TransformStream({
    transform(e, t) {
      for (; e.length > 0; )
        t.enqueue(e.slice(0, i)), e = e.slice(i);
    }
  });
}
class I {
  static certificate(e) {
    const t = [];
    for (const s of e)
      t.push(L(s.byteLength)), t.push(new Uint8Array(s));
    const n = u(t), r = new Uint8Array([
      ...L(n.byteLength),
      ...n
    ]);
    return new Uint8Array([
      E.Certificate,
      ...L(r.length),
      ...r
    ]);
  }
  /*
   * Byte layout of the ServerKeyExchange message:
   *
   * +-----------------------------------+
   * |    ServerKeyExchange Message      |
   * +-----------------------------------+
   * | Handshake type (1 byte)           |
   * +-----------------------------------+
   * | Length (3 bytes)                  |
   * +-----------------------------------+
   * | Curve Type (1 byte)               |
   * +-----------------------------------+
   * | Named Curve (2 bytes)             |
   * +-----------------------------------+
   * | EC Point Format (1 byte)          |
   * +-----------------------------------+
   * | Public Key Length (1 byte)        |
   * +-----------------------------------+
   * | Public Key (variable)             |
   * +-----------------------------------+
   * | Signature Algorithm (2 bytes)     |
   * +-----------------------------------+
   * | Signature Length (2 bytes)        |
   * +-----------------------------------+
   * | Signature (variable)              |
   * +-----------------------------------+
   *
   * @param clientRandom - 32 bytes from ClientHello
   * @param serverRandom - 32 bytes from ServerHello
   * @param ecdheKeyPair - ECDHE key pair
   * @param rsaPrivateKey - RSA private key for signing
   * @returns
   */
  static async ECDHEServerKeyExchange(e, t, n, r) {
    const s = new Uint8Array(
      await crypto.subtle.exportKey("raw", n.publicKey)
    ), a = new Uint8Array([
      // Curve type (1 byte)
      Ne.NamedCurve,
      // Curve name (2 bytes)
      ...K(ke.secp256r1),
      // Public key length (1 byte)
      s.byteLength,
      // Public key (65 bytes, uncompressed format)
      ...s
    ]), _ = await crypto.subtle.sign(
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256"
      },
      r,
      new Uint8Array([...e, ...t, ...a])
    ), S = new Uint8Array(_), c = new Uint8Array([
      V.sha256,
      $.rsa
    ]), C = new Uint8Array([
      ...a,
      ...c,
      ...K(S.length),
      ...S
    ]);
    return new Uint8Array([
      E.ServerKeyExchange,
      ...L(C.length),
      ...C
    ]);
  }
  /**
   * +------------------------------------+
   * | Content Type (Handshake)     [1B]  |
   * | 0x16                               |
   * +------------------------------------+
   * | Version (TLS 1.2)            [2B]  |
   * | 0x03 0x03                          |
   * +------------------------------------+
   * | Length                       [2B]  |
   * +------------------------------------+
   * | Handshake Type (ServerHello) [1B]  |
   * | 0x02                               |
   * +------------------------------------+
   * | Handshake Length             [3B]  |
   * +------------------------------------+
   * | Server Version               [2B]  |
   * +------------------------------------+
   * | Server Random               [32B]  |
   * +------------------------------------+
   * | Session ID Length            [1B]  |
   * +------------------------------------+
   * | Session ID             [0-32B]     |
   * +------------------------------------+
   * | Cipher Suite                 [2B]  |
   * +------------------------------------+
   * | Compression Method           [1B]  |
   * +------------------------------------+
   * | Extensions Length            [2B]  |
   * +------------------------------------+
   * | Extension: ec_point_formats        |
   * |   Type (0x00 0x0B)           [2B]  |
   * |   Length                     [2B]  |
   * |   EC Point Formats Length    [1B]  |
   * |   EC Point Format            [1B]  |
   * +------------------------------------+
   * | Other Extensions...                |
   * +------------------------------------+
   */
  static serverHello(e, t, n) {
    const r = e.extensions.map((_) => {
      switch (_.type) {
        case "server_name":
          return oe.encodeForClient();
        case "ec_point_formats":
          return Se.encodeForClient(
            "uncompressed"
          );
        case "renegotiation_info":
          return Ce.encodeForClient();
      }
    }).filter((_) => _ !== void 0), s = u(r), a = new Uint8Array([
      // Version field – 0x03, 0x03 means TLS 1.2
      ...B,
      ...t,
      e.session_id.length,
      ...e.session_id,
      ...K(le.TLS1_CK_ECDHE_RSA_WITH_AES_128_GCM_SHA256),
      n,
      // Extensions length (2 bytes)
      ...K(s.length),
      ...s
    ]);
    return new Uint8Array([
      E.ServerHello,
      ...L(a.length),
      ...a
    ]);
  }
  static serverHelloDone() {
    return new Uint8Array([E.ServerHelloDone, ...L(0)]);
  }
  /**
   * Server finished message.
   * The structure is defined in:
   * https://datatracker.ietf.org/doc/html/rfc5246#section-7.4.9
   *
   * struct {
   *     opaque verify_data[verify_data_length];
   * } Finished;
   *
   * verify_data
   *    PRF(master_secret, finished_label, Hash(handshake_messages))
   *       [0..verify_data_length-1];
   *
   * finished_label
   *    For Finished messages sent by the client, the string
   *    "client finished".  For Finished messages sent by the server,
   *    the string "server finished".
   */
  static async createFinishedMessage(e, t) {
    const n = await crypto.subtle.digest(
      "SHA-256",
      u(e)
    ), r = new Uint8Array(
      await O(
        t,
        new TextEncoder().encode("server finished"),
        n,
        // verify_data length. TLS 1.2 specifies 12 bytes for verify_data
        12
      )
    );
    return new Uint8Array([
      E.Finished,
      ...L(r.length),
      ...r
    ]);
  }
  static changeCipherSpec() {
    return new Uint8Array([1]);
  }
}
function je(i, e) {
  return Ge.generateCertificate(i, e);
}
function dt(i) {
  return `-----BEGIN CERTIFICATE-----
${Te(
    Ee(i.buffer)
  )}
-----END CERTIFICATE-----`;
}
async function Et(i) {
  const e = await crypto.subtle.exportKey("pkcs8", i);
  return `-----BEGIN PRIVATE KEY-----
${Te(
    Ee(e)
  )}
-----END PRIVATE KEY-----`;
}
class Ge {
  static async generateCertificate(e, t) {
    const n = await crypto.subtle.generateKey(
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1])
      },
      !0,
      // extractable
      ["sign", "verify"]
    ), r = await this.signingRequest(
      e,
      n.publicKey
    ), s = await this.sign(
      r,
      (t == null ? void 0 : t.privateKey) ?? n.privateKey
    );
    return {
      keyPair: n,
      certificate: s,
      tbsCertificate: r,
      tbsDescription: e
    };
  }
  static async sign(e, t) {
    const n = await crypto.subtle.sign(
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: "SHA-256"
      },
      t,
      e.buffer
    );
    return o.sequence([
      new Uint8Array(e.buffer),
      this.signatureAlgorithm("sha256WithRSAEncryption"),
      o.bitString(new Uint8Array(n))
    ]);
  }
  static async signingRequest(e, t) {
    const n = [];
    return e.keyUsage && n.push(this.keyUsage(e.keyUsage)), e.extKeyUsage && n.push(this.extKeyUsage(e.extKeyUsage)), e.subjectAltNames && n.push(this.subjectAltName(e.subjectAltNames)), e.nsCertType && n.push(this.nsCertType(e.nsCertType)), e.basicConstraints && n.push(
      this.basicConstraints(e.basicConstraints)
    ), o.sequence([
      this.version(e.version),
      this.serialNumber(e.serialNumber),
      this.signatureAlgorithm(e.signatureAlgorithm),
      this.distinguishedName(e.issuer ?? e.subject),
      this.validity(e.validity),
      this.distinguishedName(e.subject),
      await this.subjectPublicKeyInfo(t),
      this.extensions(n)
    ]);
  }
  static version(e = 2) {
    return o.ASN1(
      160,
      o.integer(new Uint8Array([e]))
    );
  }
  static serialNumber(e = crypto.getRandomValues(new Uint8Array(4))) {
    return o.integer(e);
  }
  static signatureAlgorithm(e = "sha256WithRSAEncryption") {
    return o.sequence([
      o.objectIdentifier(p(e)),
      o.null()
    ]);
  }
  static async subjectPublicKeyInfo(e) {
    return new Uint8Array(await crypto.subtle.exportKey("spki", e));
  }
  static extensions(e) {
    return o.ASN1(163, o.sequence(e));
  }
  static distinguishedName(e) {
    const t = [];
    for (const [n, r] of Object.entries(e)) {
      const s = [
        o.objectIdentifier(p(n))
      ];
      switch (n) {
        case "countryName":
          s.push(o.printableString(r));
          break;
        default:
          s.push(o.utf8String(r));
      }
      t.push(o.set([o.sequence(s)]));
    }
    return o.sequence(t);
  }
  static validity(e) {
    return o.sequence([
      o.ASN1(
        H.UTCTime,
        new TextEncoder().encode(
          re((e == null ? void 0 : e.notBefore) ?? /* @__PURE__ */ new Date())
        )
      ),
      o.ASN1(
        H.UTCTime,
        new TextEncoder().encode(
          re(
            (e == null ? void 0 : e.notAfter) ?? Ve(/* @__PURE__ */ new Date(), 10)
          )
        )
      )
    ]);
  }
  static basicConstraints({
    ca: e = !0,
    pathLenConstraint: t = void 0
  }) {
    const n = [o.boolean(e)];
    return t !== void 0 && n.push(
      o.integer(new Uint8Array([t]))
    ), o.sequence([
      o.objectIdentifier(p("basicConstraints")),
      o.octetString(o.sequence(n))
    ]);
  }
  static keyUsage(e) {
    const t = new Uint8Array([0]);
    return e != null && e.digitalSignature && (t[0] |= 1), e != null && e.nonRepudiation && (t[0] |= 2), e != null && e.keyEncipherment && (t[0] |= 4), e != null && e.dataEncipherment && (t[0] |= 8), e != null && e.keyAgreement && (t[0] |= 16), e != null && e.keyCertSign && (t[0] |= 32), e != null && e.cRLSign && (t[0] |= 64), e != null && e.encipherOnly && (t[0] |= 128), e != null && e.decipherOnly && (t[0] |= 64), o.sequence([
      o.objectIdentifier(p("keyUsage")),
      o.boolean(!0),
      // Critical
      o.octetString(o.bitString(t))
    ]);
  }
  static extKeyUsage(e = {}) {
    return o.sequence([
      o.objectIdentifier(p("extKeyUsage")),
      o.boolean(!0),
      // Critical
      o.octetString(
        o.sequence(
          Object.entries(e).map(([t, n]) => n ? o.objectIdentifier(
            p(t)
          ) : o.null())
        )
      )
    ]);
  }
  static nsCertType(e) {
    const t = new Uint8Array([0]);
    return e.client && (t[0] |= 1), e.server && (t[0] |= 2), e.email && (t[0] |= 4), e.objsign && (t[0] |= 8), e.sslCA && (t[0] |= 16), e.emailCA && (t[0] |= 32), e.objCA && (t[0] |= 64), o.sequence([
      o.objectIdentifier(p("nsCertType")),
      o.octetString(t)
    ]);
  }
  static subjectAltName(e) {
    var s, a;
    const t = ((s = e.dnsNames) == null ? void 0 : s.map((_) => {
      const S = o.ia5String(_);
      return o.contextSpecific(2, S);
    })) || [], n = ((a = e.ipAddresses) == null ? void 0 : a.map((_) => {
      const S = o.ia5String(_);
      return o.contextSpecific(7, S);
    })) || [], r = o.octetString(
      o.sequence([...t, ...n])
    );
    return o.sequence([
      o.objectIdentifier(p("subjectAltName")),
      o.boolean(!0),
      r
    ]);
  }
}
const $e = {
  // Algorithm OIDs
  "1.2.840.113549.1.1.1": "rsaEncryption",
  "1.2.840.113549.1.1.4": "md5WithRSAEncryption",
  "1.2.840.113549.1.1.5": "sha1WithRSAEncryption",
  "1.2.840.113549.1.1.7": "RSAES-OAEP",
  "1.2.840.113549.1.1.8": "mgf1",
  "1.2.840.113549.1.1.9": "pSpecified",
  "1.2.840.113549.1.1.10": "RSASSA-PSS",
  "1.2.840.113549.1.1.11": "sha256WithRSAEncryption",
  "1.2.840.113549.1.1.12": "sha384WithRSAEncryption",
  "1.2.840.113549.1.1.13": "sha512WithRSAEncryption",
  "1.3.101.112": "EdDSA25519",
  "1.2.840.10040.4.3": "dsa-with-sha1",
  "1.3.14.3.2.7": "desCBC",
  "1.3.14.3.2.26": "sha1",
  "1.3.14.3.2.29": "sha1WithRSASignature",
  "2.16.840.1.101.3.4.2.1": "sha256",
  "2.16.840.1.101.3.4.2.2": "sha384",
  "2.16.840.1.101.3.4.2.3": "sha512",
  "2.16.840.1.101.3.4.2.4": "sha224",
  "2.16.840.1.101.3.4.2.5": "sha512-224",
  "2.16.840.1.101.3.4.2.6": "sha512-256",
  "1.2.840.113549.2.2": "md2",
  "1.2.840.113549.2.5": "md5",
  // pkcs#7 content types
  "1.2.840.113549.1.7.1": "data",
  "1.2.840.113549.1.7.2": "signedData",
  "1.2.840.113549.1.7.3": "envelopedData",
  "1.2.840.113549.1.7.4": "signedAndEnvelopedData",
  "1.2.840.113549.1.7.5": "digestedData",
  "1.2.840.113549.1.7.6": "encryptedData",
  // pkcs#9 oids
  "1.2.840.113549.1.9.1": "emailAddress",
  "1.2.840.113549.1.9.2": "unstructuredName",
  "1.2.840.113549.1.9.3": "contentType",
  "1.2.840.113549.1.9.4": "messageDigest",
  "1.2.840.113549.1.9.5": "signingTime",
  "1.2.840.113549.1.9.6": "counterSignature",
  "1.2.840.113549.1.9.7": "challengePassword",
  "1.2.840.113549.1.9.8": "unstructuredAddress",
  "1.2.840.113549.1.9.14": "extensionRequest",
  "1.2.840.113549.1.9.20": "friendlyName",
  "1.2.840.113549.1.9.21": "localKeyId",
  "1.2.840.113549.1.9.22.1": "x509Certificate",
  // pkcs#12 safe bags
  "1.2.840.113549.1.12.10.1.1": "keyBag",
  "1.2.840.113549.1.12.10.1.2": "pkcs8ShroudedKeyBag",
  "1.2.840.113549.1.12.10.1.3": "certBag",
  "1.2.840.113549.1.12.10.1.4": "crlBag",
  "1.2.840.113549.1.12.10.1.5": "secretBag",
  "1.2.840.113549.1.12.10.1.6": "safeContentsBag",
  // password-based-encryption for pkcs#12
  "1.2.840.113549.1.5.13": "pkcs5PBES2",
  "1.2.840.113549.1.5.12": "pkcs5PBKDF2",
  "1.2.840.113549.1.12.1.1": "pbeWithSHAAnd128BitRC4",
  "1.2.840.113549.1.12.1.2": "pbeWithSHAAnd40BitRC4",
  "1.2.840.113549.1.12.1.3": "pbeWithSHAAnd3-KeyTripleDES-CBC",
  "1.2.840.113549.1.12.1.4": "pbeWithSHAAnd2-KeyTripleDES-CBC",
  "1.2.840.113549.1.12.1.5": "pbeWithSHAAnd128BitRC2-CBC",
  "1.2.840.113549.1.12.1.6": "pbewithSHAAnd40BitRC2-CBC",
  // hmac OIDs
  "1.2.840.113549.2.7": "hmacWithSHA1",
  "1.2.840.113549.2.8": "hmacWithSHA224",
  "1.2.840.113549.2.9": "hmacWithSHA256",
  "1.2.840.113549.2.10": "hmacWithSHA384",
  "1.2.840.113549.2.11": "hmacWithSHA512",
  // symmetric key algorithm oids
  "1.2.840.113549.3.7": "des-EDE3-CBC",
  "2.16.840.1.101.3.4.1.2": "aes128-CBC",
  "2.16.840.1.101.3.4.1.22": "aes192-CBC",
  "2.16.840.1.101.3.4.1.42": "aes256-CBC",
  // certificate issuer/subject OIDs
  "2.5.4.3": "commonName",
  "2.5.4.4": "surname",
  "2.5.4.5": "serialNumber",
  "2.5.4.6": "countryName",
  "2.5.4.7": "localityName",
  "2.5.4.8": "stateOrProvinceName",
  "2.5.4.9": "streetAddress",
  "2.5.4.10": "organizationName",
  "2.5.4.11": "organizationalUnitName",
  "2.5.4.12": "title",
  "2.5.4.13": "description",
  "2.5.4.15": "businessCategory",
  "2.5.4.17": "postalCode",
  "2.5.4.42": "givenName",
  "1.3.6.1.4.1.311.60.2.1.2": "jurisdictionOfIncorporationStateOrProvinceName",
  "1.3.6.1.4.1.311.60.2.1.3": "jurisdictionOfIncorporationCountryName",
  // X.509 extension OIDs
  "2.16.840.1.113730.1.1": "nsCertType",
  "2.16.840.1.113730.1.13": "nsComment",
  "2.5.29.14": "subjectKeyIdentifier",
  "2.5.29.15": "keyUsage",
  "2.5.29.17": "subjectAltName",
  "2.5.29.18": "issuerAltName",
  "2.5.29.19": "basicConstraints",
  "2.5.29.31": "cRLDistributionPoints",
  "2.5.29.32": "certificatePolicies",
  "2.5.29.35": "authorityKeyIdentifier",
  "2.5.29.37": "extKeyUsage",
  // extKeyUsage purposes
  "1.3.6.1.4.1.11129.2.4.2": "timestampList",
  "1.3.6.1.5.5.7.1.1": "authorityInfoAccess",
  "1.3.6.1.5.5.7.3.1": "serverAuth",
  "1.3.6.1.5.5.7.3.2": "clientAuth",
  "1.3.6.1.5.5.7.3.3": "codeSigning",
  "1.3.6.1.5.5.7.3.4": "emailProtection",
  "1.3.6.1.5.5.7.3.8": "timeStamping"
};
function p(i) {
  for (const [e, t] of Object.entries($e))
    if (t === i)
      return e;
  throw new Error(`OID not found for name: ${i}`);
}
const ne = 32, H = {
  Boolean: 1,
  Integer: 2,
  BitString: 3,
  OctetString: 4,
  Null: 5,
  OID: 6,
  Utf8String: 12,
  Sequence: 16 | ne,
  Set: 17 | ne,
  PrintableString: 19,
  IA5String: 22,
  UTCTime: 23
};
class o {
  // Helper functions for ASN.1 DER encoding
  static length_(e) {
    if (e < 128)
      return new Uint8Array([e]);
    {
      let t = e;
      const n = [];
      for (; t > 0; )
        n.unshift(t & 255), t >>= 8;
      const r = n.length, s = new Uint8Array(1 + r);
      s[0] = 128 | r;
      for (let a = 0; a < r; a++)
        s[a + 1] = n[a];
      return s;
    }
  }
  static ASN1(e, t) {
    const n = o.length_(t.length), r = new Uint8Array(1 + n.length + t.length);
    return r[0] = e, r.set(n, 1), r.set(t, 1 + n.length), r;
  }
  static integer(e) {
    if (e[0] > 127) {
      const t = new Uint8Array(e.length + 1);
      t[0] = 0, t.set(e, 1), e = t;
    }
    return o.ASN1(H.Integer, e);
  }
  static bitString(e) {
    const t = new Uint8Array([0]), n = new Uint8Array(t.length + e.length);
    return n.set(t), n.set(e, t.length), o.ASN1(H.BitString, n);
  }
  static octetString(e) {
    return o.ASN1(H.OctetString, e);
  }
  static null() {
    return o.ASN1(H.Null, new Uint8Array(0));
  }
  static objectIdentifier(e) {
    const t = e.split(".").map(Number), r = [t[0] * 40 + t[1]];
    for (let s = 2; s < t.length; s++) {
      let a = t[s];
      const _ = [];
      do
        _.unshift(a & 127), a >>= 7;
      while (a > 0);
      for (let S = 0; S < _.length - 1; S++)
        _[S] |= 128;
      r.push(..._);
    }
    return o.ASN1(H.OID, new Uint8Array(r));
  }
  static utf8String(e) {
    const t = new TextEncoder().encode(e);
    return o.ASN1(H.Utf8String, t);
  }
  static printableString(e) {
    const t = new TextEncoder().encode(e);
    return o.ASN1(H.PrintableString, t);
  }
  static sequence(e) {
    return o.ASN1(H.Sequence, u(e));
  }
  static set(e) {
    return o.ASN1(H.Set, u(e));
  }
  static ia5String(e) {
    const t = new TextEncoder().encode(e);
    return o.ASN1(H.IA5String, t);
  }
  static contextSpecific(e, t, n = !1) {
    const r = (n ? 160 : 128) | e;
    return o.ASN1(r, t);
  }
  static boolean(e) {
    return o.ASN1(
      H.Boolean,
      new Uint8Array([e ? 255 : 0])
    );
  }
}
function Ee(i) {
  return btoa(String.fromCodePoint(...new Uint8Array(i)));
}
function Te(i) {
  var e;
  return ((e = i.match(/.{1,64}/g)) == null ? void 0 : e.join(`
`)) || i;
}
function re(i) {
  const e = i.getUTCFullYear().toString().substr(2), t = P(i.getUTCMonth() + 1), n = P(i.getUTCDate()), r = P(i.getUTCHours()), s = P(i.getUTCMinutes()), a = P(i.getUTCSeconds());
  return `${e}${t}${n}${r}${s}${a}Z`;
}
function P(i) {
  return i.toString().padStart(2, "0");
}
function Ve(i, e) {
  const t = new Date(i);
  return t.setUTCFullYear(t.getUTCFullYear() + e), t;
}
class ze extends TransformStream {
  constructor() {
    let e = new Uint8Array(0), t = "SCAN_CHUNK_SIZE", n = 0;
    super({
      transform(r, s) {
        for (e = u([e, r]); e.length > 0; )
          if (t === "SCAN_CHUNK_SIZE") {
            if (e.length < 3)
              return;
            let a = 0;
            for (; a < e.length; ) {
              const c = e[a];
              if (!(c >= 48 && c <= 57 || // 0-9
              c >= 97 && c <= 102 || // a-f
              c >= 65 && c <= 70)) break;
              a++;
            }
            if (a === 0)
              throw new Error("Invalid chunk size format");
            if (e.length < a + 2)
              return;
            if (e[a] !== 13 || // \r
            e[a + 1] !== 10)
              throw new Error(
                "Invalid chunk size format. Expected CRLF after chunk size"
              );
            const _ = new TextDecoder().decode(
              e.slice(0, a)
            ), S = parseInt(_, 16);
            if (e = e.slice(a + 2), S === 0) {
              t = "SCAN_FINAL_CHUNK", s.terminate();
              return;
            }
            n = S, t = "SCAN_CHUNK_DATA";
          } else if (t === "SCAN_CHUNK_DATA") {
            const a = Math.min(
              n,
              e.length
            ), _ = e.slice(0, a);
            e = e.slice(a), n -= a, s.enqueue(_), n === 0 && (t = "SCAN_CHUNK_TRAILER");
          } else if (t === "SCAN_CHUNK_TRAILER") {
            if (e.length < 2)
              return;
            if (e[0] !== 13 || e[1] !== 10)
              throw new Error(
                "Invalid chunk trailer format. Expected CRLF after chunk data"
              );
            e = e.slice(2), t = "SCAN_CHUNK_SIZE";
          }
      }
    });
  }
}
const Ye = (i, e) => ({
  ...i,
  websocket: {
    url: (t, n, r) => `ws://playground.internal/?${new URLSearchParams({
      host: n,
      port: r
    }).toString()}`,
    subprotocol: "binary",
    decorator: () => class extends Ze {
      constructor(t, n) {
        super(t, n, {
          CAroot: e.CAroot,
          corsProxyUrl: e.corsProxyUrl
        });
      }
    }
  }
});
class Ze {
  constructor(e, t, {
    CAroot: n,
    corsProxyUrl: r,
    outputType: s = "messages"
  } = {}) {
    this.CONNECTING = 0, this.OPEN = 1, this.CLOSING = 2, this.CLOSED = 3, this.readyState = this.CONNECTING, this.binaryType = "blob", this.bufferedAmount = 0, this.extensions = "", this.protocol = "ws", this.host = "", this.port = 0, this.listeners = /* @__PURE__ */ new Map(), this.clientUpstream = new TransformStream(), this.clientUpstreamWriter = this.clientUpstream.writable.getWriter(), this.clientDownstream = new TransformStream(), this.fetchInitiated = !1, this.bufferedBytesFromClient = new Uint8Array(0), this.url = e, this.options = t;
    const a = new URL(e);
    this.host = a.searchParams.get("host"), this.port = parseInt(a.searchParams.get("port"), 10), this.binaryType = "arraybuffer", this.corsProxyUrl = r, this.CAroot = n, s === "messages" && this.clientDownstream.readable.pipeTo(
      new WritableStream({
        write: (_) => {
          this.emit("message", { data: _ });
        },
        abort: () => {
          this.emit("error", new Error("ECONNREFUSED")), this.close();
        },
        close: () => {
          this.close();
        }
      })
    ).catch(() => {
    }), this.readyState = this.OPEN, this.emit("open");
  }
  on(e, t) {
    this.addEventListener(e, t);
  }
  once(e, t) {
    const n = (r) => {
      t(r), this.removeEventListener(e, n);
    };
    this.addEventListener(e, n);
  }
  addEventListener(e, t) {
    this.listeners.has(e) || this.listeners.set(e, /* @__PURE__ */ new Set()), this.listeners.get(e).add(t);
  }
  removeListener(e, t) {
    this.removeEventListener(e, t);
  }
  removeEventListener(e, t) {
    const n = this.listeners.get(e);
    n && n.delete(t);
  }
  emit(e, t = {}) {
    e === "message" ? this.onmessage(t) : e === "close" ? this.onclose(t) : e === "error" ? this.onerror(t) : e === "open" && this.onopen(t);
    const n = this.listeners.get(e);
    if (n)
      for (const r of n)
        r(t);
  }
  // Default event handlers that can be overridden by the user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onclose(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onerror(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onmessage(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onopen(e) {
  }
  /**
   * Emscripten calls this method whenever the WASM module
   * writes bytes to the TCP socket.
   */
  send(e) {
    if (!(this.readyState === this.CLOSING || this.readyState === this.CLOSED) && (this.clientUpstreamWriter.write(new Uint8Array(e)), !this.fetchInitiated))
      switch (this.bufferedBytesFromClient = u([
        this.bufferedBytesFromClient,
        new Uint8Array(e)
      ]), Xe(this.port, this.bufferedBytesFromClient)) {
        case !1:
          return;
        case "other":
          this.emit("error", new Error("Unsupported protocol")), this.close();
          break;
        case "tls":
          this.fetchOverTLS(), this.fetchInitiated = !0;
          break;
        case "http":
          this.fetchOverHTTP(), this.fetchInitiated = !0;
          break;
      }
  }
  async fetchOverTLS() {
    if (!this.CAroot)
      throw new Error(
        "TLS protocol is only supported when the TCPOverFetchWebsocket is instantiated with a CAroot"
      );
    const e = await je(
      {
        subject: {
          commonName: this.host,
          organizationName: this.host,
          countryName: "US"
        },
        issuer: this.CAroot.tbsDescription.subject
      },
      this.CAroot.keyPair
    ), t = new qe();
    this.clientUpstream.readable.pipeTo(t.clientEnd.upstream.writable).catch(() => {
    }), t.clientEnd.downstream.readable.pipeTo(this.clientDownstream.writable).catch(() => {
    }), await t.TLSHandshake(e.keyPair.privateKey, [
      e.certificate,
      this.CAroot.certificate
    ]);
    const { request: n, expectsContinue: r } = await y.parseHttpRequest(
      t.serverEnd.upstream.readable,
      this.host,
      "https"
    );
    if (r) {
      const s = t.serverEnd.downstream.writable.getWriter();
      await s.write(
        new TextEncoder().encode(`HTTP/1.1 100 Continue\r
\r
`)
      ), s.releaseLock();
    }
    try {
      await y.fetchRawResponseBytes(
        n,
        this.corsProxyUrl
      ).pipeTo(t.serverEnd.downstream.writable);
    } catch {
    }
  }
  async fetchOverHTTP() {
    const { request: e, expectsContinue: t } = await y.parseHttpRequest(
      this.clientUpstream.readable,
      this.host,
      "http"
    );
    if (t) {
      const n = this.clientDownstream.writable.getWriter();
      await n.write(
        new TextEncoder().encode(`HTTP/1.1 100 Continue\r
\r
`)
      ), n.releaseLock();
    }
    try {
      await y.fetchRawResponseBytes(
        e,
        this.corsProxyUrl
      ).pipeTo(this.clientDownstream.writable);
    } catch {
    }
  }
  close() {
    this.emit("message", { data: new Uint8Array(0) }), this.readyState = this.CLOSING, this.emit("close"), this.readyState = this.CLOSED;
  }
}
const Je = [
  "GET",
  "POST",
  "HEAD",
  "PATCH",
  "OPTIONS",
  "DELETE",
  "PUT",
  "TRACE"
];
function Xe(i, e) {
  if (e.length < 8)
    return !1;
  if (i === 443 && e[0] === l.Handshake && // TLS versions between 1.0 and 1.2
  e[1] === 3 && e[2] >= 1 && e[2] <= 3)
    return "tls";
  const n = new TextDecoder("latin1", {
    fatal: !0
  }).decode(e);
  return Je.some(
    (s) => n.startsWith(s + " ")
  ) ? "http" : "other";
}
class y {
  /**
   * Streams a HTTP response including the status line and headers.
   */
  static fetchRawResponseBytes(e, t) {
    return new ReadableStream({
      async start(n) {
        var _;
        let r;
        try {
          r = await Ke(
            e,
            void 0,
            t
          );
        } catch (S) {
          n.enqueue(
            new TextEncoder().encode(
              `HTTP/1.1 400 Bad Request\r
Content-Length: 0\r
\r
`
            )
          ), n.error(S);
          return;
        }
        n.enqueue(y.headersAsBytes(r));
        const s = (_ = r.body) == null ? void 0 : _.getReader();
        if (!s) {
          n.close();
          return;
        }
        const a = new TextEncoder();
        for (; ; ) {
          const { done: S, value: c } = await s.read();
          if (c && (n.enqueue(
            a.encode(`${c.length.toString(16)}\r
`)
          ), n.enqueue(c), n.enqueue(a.encode(`\r
`))), S) {
            n.enqueue(a.encode(`0\r
\r
`)), n.close();
            return;
          }
        }
      }
    });
  }
  static headersAsBytes(e) {
    const t = `HTTP/1.1 ${e.status} ${e.statusText}`, n = {};
    e.headers.forEach((a, _) => {
      n[_.toLowerCase()] = a;
    }), delete n["content-length"], delete n["content-encoding"], n["transfer-encoding"] = "chunked";
    const r = [];
    for (const [a, _] of Object.entries(n))
      r.push(`${a}: ${_}`);
    const s = [t, ...r].join(`\r
`) + `\r
\r
`;
    return new TextEncoder().encode(s);
  }
  /**
   * Parses a raw, streamed HTTP request into a Request object
   * with known headers and a readable body stream.
   */
  static async parseHttpRequest(e, t, n) {
    let r = new Uint8Array(0), s = !1, a = -1;
    const _ = e.getReader();
    for (; a === -1; ) {
      const { done: v, value: W } = await _.read();
      if (v) {
        s = !0;
        break;
      }
      r = u([r, W]), a = Qe(
        r,
        new Uint8Array([13, 10, 13, 10])
      );
    }
    _.releaseLock();
    const S = r.slice(0, a), c = y.parseRequestHeaders(S), C = c.headers.get("Transfer-Encoding") !== null ? "chunked" : "content-length", h = c.headers.get("Content-Length") !== null ? parseInt(c.headers.get("Content-Length"), 10) : void 0, A = r.slice(
      a + 4
      /* Skip \r\n\r\n */
    );
    let d;
    if (c.method !== "GET") {
      const v = e.getReader();
      let W = A.length, N = A.slice(-6);
      const we = new TextEncoder().encode(`0\r
\r
`);
      d = new ReadableStream({
        async start(b) {
          A.length > 0 && b.enqueue(A);
          const k = C === "content-length" && h !== void 0 && W >= h;
          (s || k) && b.close();
        },
        async pull(b) {
          const { done: k, value: g } = await v.read();
          if (W += (g == null ? void 0 : g.length) || 0, g && (b.enqueue(g), N = u([
            N,
            g || new Uint8Array()
          ]).slice(-5)), k || C === "content-length" && h !== void 0 && W >= h || C === "chunked" && N.every(
            (Le, ye) => Le === we[ye]
          )) {
            b.close();
            return;
          }
        }
      }), C === "chunked" && (d = d.pipeThrough(
        new ze()
      ));
    }
    const M = c.headers.get("Host") ?? t, pe = new URL(c.path, n + "://" + M);
    return {
      request: new Request(pe.toString(), {
        method: c.method,
        headers: c.headers,
        body: d,
        // @ts-expect-error duplex is required for streaming request bodies
        duplex: d ? "half" : void 0
      }),
      expectsContinue: c.expectsContinue
    };
  }
  static parseRequestHeaders(e) {
    var S;
    const t = new TextDecoder().decode(e), n = t.split(`
`)[0], [r, s] = n.split(" "), a = new Headers();
    for (const c of t.split(`\r
`).slice(1)) {
      if (c === "")
        break;
      const C = c.indexOf(":");
      if (C === -1)
        continue;
      const h = c.slice(0, C).trim(), A = c.slice(C + 1).trimStart();
      h !== "" && a.set(h, A);
    }
    const _ = ((S = a.get("Expect")) == null ? void 0 : S.toLowerCase()) === "100-continue";
    return a.delete("Expect"), { method: r, path: s, headers: a, expectsContinue: _ };
  }
}
function Qe(i, e) {
  const t = i.length, n = e.length, r = t - n;
  for (let s = 0; s <= r; s++) {
    let a = !0;
    for (let _ = 0; _ < n; _++)
      if (i[s + _] !== e[_]) {
        a = !1;
        break;
      }
    if (a)
      return s;
  }
  return -1;
}
async function et(i = G) {
  switch (i) {
    case "8.5":
      return (await import("@php-wasm/web-8-5")).getIntlExtensionPath();
    case "8.4":
      return (await import("@php-wasm/web-8-4")).getIntlExtensionPath();
    case "8.3":
      return (await import("@php-wasm/web-8-3")).getIntlExtensionPath();
    case "8.2":
      return (await import("@php-wasm/web-8-2")).getIntlExtensionPath();
    case "8.1":
      return (await import("@php-wasm/web-8-1")).getIntlExtensionPath();
    case "8.0":
      return (await import("@php-wasm/web-8-0")).getIntlExtensionPath();
    case "7.4":
      return (await import("@php-wasm/web-7-4")).getIntlExtensionPath();
  }
  throw new Error(`Unsupported PHP version ${i}`);
}
async function tt(i = G, e) {
  const t = De(fetch), n = "intl.so", r = "icu.dat", s = await et(i), a = (await import("./shared/icu.dat")).default, [_, S] = await Promise.all([
    t(s).then((c) => c.arrayBuffer()),
    t(a).then((c) => c.arrayBuffer())
  ]);
  return {
    ...e,
    ENV: {
      ...e.ENV,
      PHP_INI_SCAN_DIR: "/internal/shared/extensions",
      ICU_DATA: "/internal/shared"
    },
    onRuntimeInitialized: (c) => {
      e.onRuntimeInitialized && e.onRuntimeInitialized(c), w.fileExists(
        c.FS,
        "/internal/shared/extensions"
      ) || c.FS.mkdirTree("/internal/shared/extensions"), w.fileExists(
        c.FS,
        `/internal/shared/extensions/${n}`
      ) || c.FS.writeFile(
        `/internal/shared/extensions/${n}`,
        new Uint8Array(_)
      ), w.fileExists(
        c.FS,
        "/internal/shared/extensions/intl.ini"
      ) || c.FS.writeFile(
        "/internal/shared/extensions/intl.ini",
        [
          `extension=/internal/shared/extensions/${n}`
        ].join(`
`)
      ), w.fileExists(
        c.FS,
        `${c.ENV.ICU_DATA}/${r}`
      ) || (c.FS.mkdirTree(c.ENV.ICU_DATA), c.FS.writeFile(
        `${c.ENV.ICU_DATA}/icudt74l.dat`,
        new Uint8Array(S)
      ));
    }
  };
}
const nt = () => ({
  websocket: {
    decorator: (i) => class extends i {
      constructor() {
        try {
          super();
        } catch {
        }
      }
      send() {
        return null;
      }
    }
  }
});
async function ft(i, e = {}) {
  var s;
  "setImmediate" in globalThis || (globalThis.setImmediate = (a) => setTimeout(a, 0));
  let t = {
    ...nt(),
    ...e.emscriptenOptions || {}
  };
  e.tcpOverFetch && (t = Ye(
    t,
    e.tcpOverFetch
  )), e.withIntl && (t = tt(i, t));
  const [n, r] = await Promise.all([
    Pe(i),
    t
  ]);
  return (s = e.onPhpLoaderModuleLoaded) == null || s.call(e, n), await me(n, r);
}
function pt(i, e) {
  window.addEventListener("message", (t) => {
    t.source === i.contentWindow && (e && t.origin !== e || typeof t.data != "object" || t.data.type !== "relay" || window.parent.postMessage(t.data, "*"));
  }), window.addEventListener("message", (t) => {
    var n;
    t.source === window.parent && (typeof t.data != "object" || t.data.type !== "relay" || (n = i == null ? void 0 : i.contentWindow) == null || n.postMessage(t.data));
  });
}
async function wt(i) {
  const e = new Worker(i, { type: "module" });
  return new Promise((t, n) => {
    e.onerror = (s) => {
      const a = new Error(
        `WebWorker failed to load at ${i}. ${s.message ? `Original error: ${s.message}` : ""}`
      );
      a.filename = s.filename, n(a);
    };
    function r(s) {
      s.data === "worker-script-started" && (t(e), e.removeEventListener("message", r));
    }
    e.addEventListener("message", r);
  });
}
function Lt(i, e = { initialSync: {} }) {
  return e = {
    ...e,
    initialSync: {
      ...e.initialSync,
      direction: e.initialSync.direction ?? "opfs-to-memfs"
    }
  }, async function(t, n, r) {
    return e.initialSync.direction === "opfs-to-memfs" ? (w.fileExists(n, r) && w.rmdir(n, r), w.mkdir(n, r), await rt(n, i, r)) : await fe(
      n,
      i,
      r,
      e.initialSync.onProgress
    ), it(t, i, r);
  };
}
async function rt(i, e, t) {
  w.mkdir(i, t);
  const n = new ge({
    concurrency: 40
  }), r = [], s = [
    [e, t]
  ];
  for (; s.length > 0; ) {
    const [a, _] = s.pop();
    for await (const S of a.values()) {
      const c = n.run(async () => {
        const C = ae(
          _,
          S.name
        );
        if (S.kind === "directory") {
          try {
            i.mkdir(C);
          } catch (h) {
            if ((h == null ? void 0 : h.errno) !== 20)
              throw U.error(h), h;
          }
          s.push([S, C]);
        } else if (S.kind === "file") {
          const h = await S.getFile(), A = new Uint8Array(await h.arrayBuffer());
          i.createDataFile(
            _,
            S.name,
            A,
            !0,
            !0,
            !0
          );
        }
        r.splice(r.indexOf(c), 1);
      });
      r.push(c);
    }
    for (; s.length === 0 && r.length > 0; )
      await Promise.any(r);
  }
}
async function fe(i, e, t, n) {
  i.mkdirTree(t);
  const r = [];
  async function s(C, h) {
    await Promise.all(
      i.readdir(C).filter(
        (A) => A !== "." && A !== ".."
      ).map(async (A) => {
        const d = ae(C, A);
        if (!st(i, d)) {
          r.push([h, d, A]);
          return;
        }
        const M = await h.getDirectoryHandle(A, {
          create: !0
        });
        return await s(d, M);
      })
    );
  }
  await s(t, e);
  let a = 0;
  const _ = n && ot(n, 100), S = 100, c = /* @__PURE__ */ new Set();
  try {
    for (const [C, h, A] of r) {
      const d = j(
        C,
        A,
        i,
        h
      ).then(() => {
        a++, c.delete(d), _ == null || _({
          files: a,
          total: r.length
        });
      });
      c.add(d), c.size >= S && (await Promise.race(c), _ == null || _({
        files: a,
        total: r.length
      }));
    }
  } finally {
    await Promise.allSettled(c);
  }
}
function st(i, e) {
  return i.isDir(i.lookupPath(e, { follow: !0 }).node.mode);
}
async function j(i, e, t, n) {
  let r;
  try {
    r = t.readFile(n, {
      encoding: "binary"
    });
  } catch {
    return;
  }
  const s = await i.getFileHandle(e, { create: !0 }), a = s.createWritable !== void 0 ? (
    // Google Chrome, Firefox, probably more browsers
    await s.createWritable()
  ) : (
    // Safari
    await s.createSyncAccessHandle()
  );
  try {
    await a.truncate(0), await a.write(r);
  } finally {
    await a.close();
  }
}
function it(i, e, t) {
  const n = [], r = We(i, t, (_) => {
    n.push(_);
  }), s = new at(i, e, t);
  async function a() {
    if (n.length === 0)
      return;
    const _ = await i.semaphore.acquire(), S = [...n];
    n.splice(0, S.length);
    const c = be(S);
    try {
      for (const C of c)
        await s.processEntry(C);
    } finally {
      _();
    }
  }
  return i.addEventListener("request.end", a), i.addEventListener("filesystem.write", a), function() {
    r(), i.removeEventListener("request.end", a), i.removeEventListener("filesystem.write", a);
  };
}
class at {
  constructor(e, t, n) {
    this.php = e, this.opfs = t, this.memfsRoot = se(n);
  }
  toOpfsPath(e) {
    return se(e.substring(this.memfsRoot.length));
  }
  async processEntry(e) {
    if (!e.path.startsWith(this.memfsRoot) || e.path === this.memfsRoot)
      return;
    const t = this.toOpfsPath(e.path), n = await ie(this.opfs, t), r = _t(t);
    if (r)
      try {
        if (e.operation === "DELETE")
          try {
            await n.removeEntry(r, {
              recursive: !0
            });
          } catch {
          }
        else if (e.operation === "CREATE")
          e.nodeType === "directory" ? await n.getDirectoryHandle(r, {
            create: !0
          }) : await n.getFileHandle(r, {
            create: !0
          });
        else if (e.operation === "WRITE")
          await j(
            n,
            r,
            this.php[F].FS,
            e.path
          );
        else if (e.operation === "RENAME" && e.toPath.startsWith(this.memfsRoot)) {
          const s = this.toOpfsPath(e.toPath), a = await ie(
            this.opfs,
            s
          );
          if (e.nodeType === "directory") {
            const _ = await a.getDirectoryHandle(
              r,
              {
                create: !0
              }
            );
            await fe(
              this.php[F].FS,
              _,
              e.toPath
            ), await n.removeEntry(r, {
              recursive: !0
            });
          } else {
            try {
              await n.removeEntry(r);
            } catch {
            }
            await j(
              a,
              Ie(s),
              this.php[F].FS,
              e.toPath
            );
          }
        }
      } catch (s) {
        throw U.log({ entry: e, name: r }), U.error(s), s;
      }
  }
}
function se(i) {
  return i.replace(/\/$/, "").replace(/\/\/+/g, "/");
}
function _t(i) {
  return i.substring(i.lastIndexOf("/") + 1);
}
async function ie(i, e) {
  const t = e.replace(/^\/+|\/+$/g, "").replace(/\/+/, "/");
  if (!t)
    return i;
  const n = t.split("/");
  let r = i;
  for (let s = 0; s < n.length - 1; s++) {
    const a = n[s];
    r = await r.getDirectoryHandle(a, { create: !0 });
  }
  return r;
}
function ot(i, e) {
  let t = 0, n, r;
  return function(...a) {
    r = a;
    const _ = Date.now() - t;
    if (n === void 0) {
      const S = Math.max(0, e - _);
      n = setTimeout(() => {
        n = void 0, t = Date.now(), i(...r);
      }, S);
    }
  };
}
export {
  Dt as FirewallInterferenceError,
  dt as certificateToPEM,
  gt as consumeAPI,
  Lt as createDirectoryHandleMountHandler,
  It as exposeAPI,
  Wt as fetchWithCorsProxy,
  je as generateCertificate,
  Pe as getPHPLoaderModule,
  ft as loadWebRuntime,
  Et as privateKeyToPEM,
  pt as setupPostMessageRelay,
  wt as spawnPHPWorkerThread
};
//# sourceMappingURL=index.js.map
