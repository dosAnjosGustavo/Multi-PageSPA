import React from 'react';
import EventForm from '../components/EventForm';
import { useRouteLoaderData } from 'react-router-dom';
import { LoaderEventData } from './EventDetail';

const EditEventPage = () => {
  const data = useRouteLoaderData('event-detail') as LoaderEventData;

  return <EventForm method="patch" event={data.event} />;
};

export default EditEventPage;
