export class CreateCommentDto {
  userId?: number;
  text?: string;
  replies?: [];
  parentComment?: number | null;
}
