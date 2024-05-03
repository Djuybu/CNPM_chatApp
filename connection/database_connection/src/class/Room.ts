import { Chat } from "./Chat";

export class Room {
  private partnersId: string[];
  private roomName: string;
  public ownerId: string ="";
  private avatar: string ="https://www.google.com/url?sa=i&url=https%3A%2F%2Finkythuatso.com%2Fhinh-anh-dep%2Fanh-meo-den-trang-4828.html&psig=AOvVaw0YHsip9_e_F0dwR5lj2o-m&ust=1713975214177000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNjipLDd2IUDFQAAAAAdAAAAABAE";
  private roomId: string = "";
  private chats: Chat[] = [];

  constructor(partnersId: string[], avatar: string, ownerId: string, roomName: string, roomId: string, chats: Chat[]) {
    this.ownerId = ownerId;
    this.partnersId = partnersId;
    if(avatar) {
        this.avatar = avatar;
    }
    this.roomName = roomName;
    this.roomId = roomId;
    this.chats = chats;
  }

  // Getter for partnersId
  getPartnersId(): string[] {
    return this.partnersId;
  }

  // Setter for partnersId
  setPartnersId(newPartnersId: string[]) {
    this.partnersId = newPartnersId;
  }

  // Getter for avatar
  getAvatar(): string {
    return this.avatar;
  }

  // Setter for avatar
  setAvatar(newAvatar: string) {
    this.avatar = newAvatar;
  }

  getRoomName(): string {
    return this.roomName;
  }

  getId(): string {
    return this.roomId;
  }

  getChats(): Chat[] {
    return this.chats;
  }

  getRoomId(): string {
    return this.roomId;
  }

  toObject(): object {
    return {ownerId:this.ownerId, partnersId:[...this.partnersId], avatar:this.avatar, isGroup: false, id: this.roomId}
  }
}
