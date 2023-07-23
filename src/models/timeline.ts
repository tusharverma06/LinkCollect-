import mongoose, { Schema, Document } from 'mongoose';

export interface ITimeline extends Document {
  collectionId: Schema.Types.ObjectId;
  title?: string;
  link: string;
  isPinned?: boolean;
  note?: string;
  favicon?: string;
}

const timelineSchema: Schema = new Schema(
  {
    collectionId: {
      type: Schema.Types.ObjectId,
      ref: 'Collection',
      required: true,
    },
    title: {
      type: String,
    },
    isPinned: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    favicon: {
      type: String,
    },
  },
  { timestamps: true }
);

 // For the Link collection
//  timelineSchema.index({ title: "text" });

const Timeline = mongoose.model<ITimeline>('Timeline', timelineSchema);
export default Timeline;
