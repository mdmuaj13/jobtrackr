import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
	name: string;
	email: string;
	password: string;
	role: string;
	image?: string;
	resetPasswordToken?: string;
	resetPasswordExpires?: Date;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, default: 'admin' },
		image: { type: String, default: null },
		resetPasswordToken: { type: String, default: null },
		resetPasswordExpires: { type: Date, default: null },
		deletedAt: { type: Date, default: null },
	},
	{
		timestamps: true,
	}
);

userSchema.index({ deletedAt: 1 });

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	try {
		this.password = await bcrypt.hash(this.password, 12);
		next();
	} catch (error) {
		next(error as Error);
	}
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
	return bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || model<IUser>('User', userSchema);

export default User;
