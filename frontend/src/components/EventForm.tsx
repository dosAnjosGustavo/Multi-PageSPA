import React from 'react';

import {
  ActionFunction,
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

import classes from './EventForm.module.css';
import { Event } from '../pages/Events';
import { getAuthToken } from '../util/auth';
import { API_URL, EVENTS } from '../configs';

interface EventFormProps {
  event?: Event;
  method?: any;
}

interface FormDataErrors {
  [key: string]: string;
}

const EventForm = ({ method, event }: EventFormProps) => {
  const data = useActionData() as FormDataErrors;
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data?.errors && (
        <ul>
          {Object.values(data.errors).map((err: string) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event?.title}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event?.image}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event?.date}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          defaultValue={event?.description}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Save'}
        </button>
      </div>
    </Form>
  );
};

export default EventForm;

export const action: ActionFunction = async ({ request, params }) => {
  const method = request.method;

  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  let url = API_URL + EVENTS;

  if (method === 'PATCH') {
    const eventId = params.id;
    url += eventId;
  }

  const token = getAuthToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
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
