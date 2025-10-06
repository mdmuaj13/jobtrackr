import { Schema, model, models } from 'mongoose';

interface ICompany {
	name: string;
	industry?: string;
	location?: string;
	website?: string;
	description?: string;
	contact_email?: string;
	contact_phone?: string;
	logo_url?: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

const companySchema = new Schema<ICompany>(
	{
		name: { type: String, required: true },
		industry: { type: String },
		location: { type: String },
		website: { type: String },
		description: { type: String },
		contact_email: { type: String },
		contact_phone: { type: String },
		logo_url: { type: String },
		deletedAt: { type: Date, default: null },
	},
	{
		timestamps: true,
	}
);

companySchema.index({ name: 1 });
companySchema.index({ industry: 1 });
companySchema.index({ location: 1 });
companySchema.index({ deletedAt: 1 });

const Company = models.Company || model<ICompany>('Company', companySchema);

export default Company;
