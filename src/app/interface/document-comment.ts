import { CommentReason } from '../models/comment-reason';

/**
 * Represent a document comment
 * @export
 * @interface DocumentComment
 */
export interface DocumentComment {
    id: number;
    comment: string;
    user: string;
    commentReason: CommentReason;
    commentReasonId: number;
    documentId: number;
    creationDate: string;
  }
