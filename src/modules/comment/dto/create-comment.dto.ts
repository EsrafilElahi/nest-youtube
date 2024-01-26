export class CreateCommentDto {
  userId?: number;
  text?: string;
  replies?: any[];
  parentComment?: number;
}
