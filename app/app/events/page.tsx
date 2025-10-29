import { EventsList } from '@/components/events/events-list';

const EventsPage = () => {
	return (
		<div>
			<div className="flex-1 space-y-4 p-8 pt-6">
				<EventsList />
			</div>
		</div>
	);
};

export default EventsPage;
