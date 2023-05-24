import React from 'react';
import EventForm from '../components/EventForm';
import { ActionFunction, json, redirect } from 'react-router-dom';
import { API_URL } from '../configs';

const NewEventPage = () => {
  return <EventForm method={'post'} />;
};

export default NewEventPage;

export const action: ActionFunction = async ({ request, params }) => {
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  return redirect('/events');
};
