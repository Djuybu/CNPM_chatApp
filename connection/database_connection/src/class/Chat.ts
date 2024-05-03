export class Chat {
    private senderId: string;
    private textContent: string;
    private mediaContent: { type: string; link: string };
  
    constructor(senderId: string, textContent: string, mediaContent: { type: string; link: string } = { type: "none", link: "" }) {
      this.senderId = senderId;
      this.textContent = textContent;
      this.mediaContent = mediaContent;
  
      // Optional validation (consider using a library like `class-validator`)
      if (!senderId || (textContent === null && this.mediaContent.type === "none")) {
        throw new Error("Invalid Chat message: senderId and either textContent or mediaContent are required.");
      }
    }
  
    // Getters (optional, but improve data access)
    getSenderId(): string {
      return this.senderId;
    }
  
    getTextContent(): string | null {
      return this.textContent;
    }
  
    getMediaContent(): { type: string; link: string } {
      return this.mediaContent;
    }
  
    // Setters
    setTextContent(newTextContent: string) {
      this.textContent = newTextContent;
    }
  
    setMediaContent(newMediaContent: { type: string; link: string }) {
      this.mediaContent = newMediaContent;
    }
  
    toObject(): { senderId: string; textContent: string | null; mediaContent: { type: string; link: string } } {
      return {
        senderId: this.senderId,
        textContent: this.textContent,
        mediaContent: this.mediaContent,
      };
    }
  
  }
  