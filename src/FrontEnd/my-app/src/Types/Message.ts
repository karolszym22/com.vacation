export interface Message {
    id?: number;
    correspondenceId: number;
    description?: String;
    title?: String;
    authorId: number;
    authorName: string;
    recipientId: number;
    date: String;
  }