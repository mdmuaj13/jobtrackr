import { Schema, model, models } from 'mongoose';

interface ITest {
	name: string;
	value: string;
	createdAt: Date;
	updatedAt: Date;
}

const testSchema = new Schema<ITest>(
	{
		name: { type: String, required: true },
		value: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Test = models.Test || model<ITest>('Test', testSchema);

export default Test;
