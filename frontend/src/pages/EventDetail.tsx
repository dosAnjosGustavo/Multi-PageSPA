import React, { Suspense } from 'react';

import EventItem from '../components/EventItem';
import {
  ActionFunction,
  Await,
  LoaderFunction,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from 'react-router-dom';
import { Event } from './Events';
import { API_URL, EVENTS } from '../configs';
import EventsList from '../components/EventsList';
import { getAuthToken } from '../util/auth';

export interface LoaderEventData {
  isError?: boolean;
  message?: string;
  event?: Event;
  events?: Event[];
}

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData(
    'event-detail'
  ) as LoaderEventData;

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

const loadEvent = async (id: string) => {
  const response = await fetch(API_URL + EVENTS + id);

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

const loadEvents = async () => {
  const response = await fetch(API_URL + EVENTS);

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

export const loader: LoaderFunction = async ({ request, params }) => {
  const id = params.id as string;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
};

export const action: ActionFunction = async ({ params, request }) => {
  const token = getAuthToken();

  const eventId = params.id;

  const response = await fetch(API_URL + EVENTS + eventId, {
    method: request.method,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete event.' }, { status: 500 });
  }

  return redirect('/events');
};
