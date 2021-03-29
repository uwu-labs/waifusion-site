/* eslint-disable camelcase */

export interface HivenClientUser {
  icon: string;
  id: string;
  name: string;
  token: string;
  username: string;
  user_flags: string;
}

export interface HivenUser {
  bio: string;
  bot: boolean;
  email_verified?: boolean;
  header?: string;
  icon?: string;
  id: string;
  location?: string;
  name: string;
  user_flags: string;
  username: string;
  website?: string;
  presence?: string;
}

export interface HivenHouseMembership {
  house_id: string;
  joined_at: string;
  last_permission_update: null | string;
  roles: null | string[];
  user_id: string;
}

export interface HivenHouseMemberships {
  [house_id: string]: HivenHouseMembership;
}

export interface HivenHouseMember {
  house_id: string;
  id: string;
  joined_at: string;
  presence: string;
  roles: string[];
  user: HivenUser;
  user_id: string;
  last_permission_update?: string;
}

export interface HivenRoom {
  house_id: string;
  id: string;
  name: string;
}

export interface HivenMessageAttachment {
  dimensions: {
    height: number | null;
    type: string | null;
    width: number | null;
  };
  finename: string;
  media_url: string;
}

export interface HivenMention {
  bot: boolean;
  header?: string;
  icon?: string;
  id: string;
  name: string;
  user_flags: string;
  username: string;
}

enum HivenMessageType {
  USER_MESSAGE = 0,
  SYSTEM_MESSAGE,
}

export interface HivenMessage {
  attachment?: HivenMessageAttachment;
  author?: HivenUser;
  author_id?: string;
  bucket: number;
  content: string;
  device_id?: string;
  edited_at?: string;
  embed: any;
  exploding: boolean;
  exploding_age: string;
  id: string;
  mentions: [];
  room_id: string;
  timestamp: string;
  type: HivenMessageType;
  metadata?: any;

  // Below are frontend-only types
  pending?: boolean;
}

export enum HivenPermissionOverrideType {
  ROLE,
  USER,
}

export interface HivenPermissionOverride {
  id: string;
  type: HivenPermissionOverrideType;
  allow: number;
  deny: number;
}

export interface HivenPermissionOverrides {
  [override_id: string]: HivenPermissionOverride;
}

export interface HivenMessageRoom extends HivenRoom {
  status?: "AWAITING_PUBLIC_KEYS" | "READY" | "DESTROYED";
  public_keys?: { [user_id: string]: string };
  description: string | null;
  last_message_id: string;
  permission_overrides: HivenPermissionOverrides;
  position: number;
  recipients: HivenMention[];
  type: number;
  typing: any;
  emoji: { type: number; data: string } | null;
  owner_id?: string;
  default_permission_override: HivenPermissionOverride;
}

export interface HivenHouseEntity {
  house_id: string;
  id: string;
  name?: string;
  position: number;
  resource_pointers: HivenResourcePointer[];
  type: number;
}

export interface HivenHouse {
  banner: string | null;
  icon: string | null;
  id: string;
  members: HivenHouseMember[];
  entities: HivenHouseEntity[];
  roles: HivenRole[];
  name: string;
  owner_id: string;
  rooms: HivenMessageRoom[];
  synced: boolean;
  unavailable?: boolean;
  default_permissions?: number;
}

export interface HivenRole {
  name: string;
  position: number;
  level: number;
  allow: number;
  deny: number;
  color: string;
  id: string;
}

export interface HivenRelationship {
  last_updated_at: string;
  type: number;
  user: HivenMention;
  user_id: string;
}

export interface HivenReadState {
  [room_id: string]: {
    message_id: string;
    mention_count: number;
  };
}

export interface HivenHouses {
  [house_id: string]: HivenHouse;
}

export interface HivenMessageCache {
  [room_id: string]: HivenMessage[] & {
    ceiling: boolean;
  };
}

export interface HivenUserPresence {
  [user_id: string]: HivenUser;
}

export interface HivenMessageRooms {
  [room_id: string]: HivenMessageRoom;
}

export interface HivenRelationships {
  [user_id: string]: HivenRelationship;
}

export interface HivenHouseMembers {
  [house_id: string]: { [user_id: string]: HivenHouseMember };
}

export enum HivenResourceType {
  ROOM = "room",
}

export interface HivenResourcePointer {
  resource_type: HivenResourceType;
  resource_id: string;
}

export interface HivenSelectedEntityCache {
  [house_id: string]: HivenResourcePointer;
}

export interface HivenUserInterface {
  compact_members: boolean;
  last_room: {
    id: string;
    type: string;
  };
  selected_house: string;
  selected_private_room: string;
  pending_dm_message?: HivenMessage;
  swarm_connected: boolean;
  allow_secret_chat_create_navigate: boolean;
  theme: any;
  drag_n_drop?: boolean;
  current_room_id?: string;
  popover_state: any;
  custom_theme: any;
}

export interface HivenRTCState {
  user_id: string;
  room_id: string;
  muted: boolean;
  deafened: false;
  video: false;
  joined_at: number;
}

export interface HivenCall {
  recipients: string[];
  ringing: string[];
  room_id: string;
  initiator: string;
  rtc_states: HivenRTCState[];
  join_token: string;
}

export interface HivenIncomingCall {
  room_id: string;
  room: HivenMessageRoom;
}

export interface HivenRTCCalls {
  [room_id: string]: any;
}

export interface HivenRTCPeerStates {
  [key: string]: any;
}

export interface HivenRTC {
  current_voice_room_id: string | null;
  rtc_connection_state: string;
  incoming_call: HivenIncomingCall;
  calls: HivenRTCCalls;
  consumers: any[];
  peer_rtp_states: HivenRTCPeerStates;
  audio_input_device_id: string | null;
  audio_output_device_id: string | null;
  screenshare_enabled: boolean;
  video_enabled: boolean;
}

export interface HivenHandoff {
  device_id: string | null;
  room_id: string | null;
}

export interface HivenCrypto {
  public_key: string | null;
}

export interface HivenReduxState {
  houses: HivenHouses;
  message_cache: HivenMessageCache;
  selected_entity_cache: HivenSelectedEntityCache;
  modal: {
    open_modal?: string;
    optional_modal_data: any;
  };
  presence: HivenUserPresence;
  private_rooms: HivenMessageRooms;
  read_state: HivenReadState;
  relationships: HivenRelationships;
  rooms: HivenMessageRooms;
  ui: HivenUserInterface;
  user: HivenClientUser;
  rtc: HivenRTC;
  handoff: HivenHandoff;
  settings: any;
  selectedRoom?: string;
  house_memberships?: HivenHouseMemberships;
  house_members?: HivenHouseMembers;
  crypto: HivenCrypto;
}

export interface HivenTheme {
  layoutLightest: string;
  layoutLighter: string;
  layoutLight: string;
  layoutDark: string;
  layoutDarker: string;
  layoutDarkest: string;
  textLightest: string;
  textLighter: string;
  textLight: string;
  textDark: string;
  textDarker: string;
  textDarkest: string;
  success: string;
  debug: string;
  warning: string;
  error: string;
  brand: string;
  name: any;
}

export interface HivenInvite {
  code: string;
  created_at: string;
  creator: string;
  house_id: string;
  max_age: number;
  max_uses: number;
  type: number;
}

export interface HivenInviteResponse {
  counts: {
    house_members: number;
    online?: number;
  };
  house: {
    icon?: string;
    id: string;
    name: string;
    owner_id: string;
    type: number;
    description?: string;
  };
  invite: HivenInvite;
}

export interface HivenPaymentMethod {
  user_id: string;
  stripe_id: string;
  brand: string;
  exp_month: number;
  exp_year: number;
  last4: string;
  is_default: boolean;
  is_active: boolean;
}
