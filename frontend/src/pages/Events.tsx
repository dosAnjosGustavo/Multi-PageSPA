import React, { Suspense } from 'react';

import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { API_URL } from '../configs';

export interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
  description: string;
}

interface LoaderEventsData {
  isError?: boolean;
  message?: string;
  events?: Event[];
}

function EventsPage() {
  const { events } = useLoaderData() as LoaderEventsData;

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.'
    // throw { message: 'Could not fetch events', error: 300 };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,});
    return json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
