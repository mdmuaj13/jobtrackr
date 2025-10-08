import { Schema, model, models } from 'mongoose';

interface IJob {
	title: string;
	description?: string;
	company_name: string;
	company_id?: Schema.Types.ObjectId;
	location?: string;
	job_type?: 'full-time' | 'part-time' | 'contract' | 'internship' | 'freelance';
	work_mode?: 'remote' | 'hybrid' | 'onsite';
	salary_min?: number;
	salary_max?: number;
	salary_currency?: string;
	job_url?: string;
	company_url?: string;
	linkedin_url?: string;
	application_link?: string;
	application_process?: string;
	status: 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted' | 'withdrawn';
	applied_date?: Date;
	deadline?: Date;
	special_requirements?: string;
	skills?: string[];
	notes?: string;
	user_id?: Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
}

const jobSchema = new Schema<IJob>(
	{
		title: { type: String, required: true },
		description: { type: String },
		company_name: { type: String, required: true },
		company_id: { type: Schema.Types.ObjectId, ref: 'Company' },
		location: { type: String },
		job_type: {
			type: String,
			enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance']
		},
		work_mode: {
			type: String,
			enum: ['remote', 'hybrid', 'onsite']
		},
		salary_min: { type: Number },
		salary_max: { type: Number },
		salary_currency: { type: String, default: 'USD' },
		job_url: { type: String },
		company_url: { type: String },
		linkedin_url: { type: String },
		application_link: { type: String },
		application_process: { type: String },
		status: {
			type: String,
			enum: ['saved', 'applied', 'interviewing', 'offered', 'rejected', 'accepted', 'withdrawn'],
			default: 'saved'
		},
		applied_date: { type: Date, default: null },
		deadline: { type: Date },
		special_requirements: { type: String },
		skills: [{ type: String }],
		notes: { type: String },
		user_id: { type: Schema.Types.ObjectId, ref: 'User' },
		deletedAt: { type: Date, default: null },
	},
	{
		timestamps: true,
	}
);

jobSchema.index({ title: 1 });
jobSchema.index({ company_name: 1 });
jobSchema.index({ company_id: 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ job_type: 1 });
jobSchema.index({ work_mode: 1 });
jobSchema.index({ deadline: 1 });
jobSchema.index({ user_id: 1 });
jobSchema.index({ deletedAt: 1 });

const Job = models.Job || model<IJob>('Job', jobSchema);

export default Job;
