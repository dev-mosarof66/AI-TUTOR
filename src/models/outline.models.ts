import { Schema, model, models, Document } from 'mongoose';

interface IModule {
  title: string;
  topics: string[];
}

export interface IOutline extends Document {
  title: string;
  modules: IModule[];
}

// Module schema
const ModuleSchema = new Schema<IModule>({
  title: { type: String, required: true },
  topics: [{ type: String, required: true }],
});

// Outline schema
const OutlineSchema = new Schema<IOutline>(
  {
    title: { type: String, required: true },
    modules: [ModuleSchema],
  },
  {
    timestamps: true,
  }
);

// Export the model
const Outline = models.Outline || model<IOutline>('Outline', OutlineSchema);
export default Outline;
