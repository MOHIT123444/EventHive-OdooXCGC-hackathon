import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector(state => state.auth);
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    numberOfTickets: 1,
    specialRequirements: ''
  });

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/events/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch event details');
      }
      
      const data = await response.json();
      setEvent(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    setBookingLoading(true);
    
    try {
      // This will be implemented when we create the booking system
      // For now, just show a success message
      alert(`Booking request submitted for ${bookingData.numberOfTickets} ticket(s)!`);
      setShowBookingForm(false);
      setBookingData({ numberOfTickets: 1, specialRequirements: '' });
    } catch (err) {
      alert('Failed to submit booking. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'conference': return 'bg-purple-100 text-purple-800';
      case 'workshop': return 'bg-yellow-100 text-yellow-800';
      case 'seminar': return 'bg-indigo-100 text-indigo-800';
      case 'meetup': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <Loader text="Loading event details..." />;

  if (error) {
    return (
      <div className="container">
        <div className="text-center py-12">
          <div className="text-error mb-4">{error}</div>
          <button 
            onClick={fetchEventDetails}
            className="btn btn-primary mr-4"
          >
            Try Again
          </button>
          <Link to="/events" className="btn btn-outline">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container">
        <div className="text-center py-12">
          <div className="text-error mb-4">Event not found</div>
          <Link to="/events" className="btn btn-primary">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const isEventFull = event.currentBookings >= event.capacity;
  const availableSpots = event.capacity - event.currentBookings;

  return (
    <div className="container">
      {/* Back Button */}
      <div className="mb-6">
        <Link to="/events" className="inline-flex items-center text-primary hover:text-primary-dark">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Events
        </Link>
      </div>

      {/* Event Header */}
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Event Image */}
          <div className="lg:w-1/3">
            {event.image ? (
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 lg:h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Event Info */}
          <div className="lg:w-2/3 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                {event.category}
              </span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">{event.description}</p>

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Date</div>
                    <div className="text-gray-600">{formatDate(event.date)}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Time</div>
                    <div className="text-gray-600">{event.time}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-gray-600">{event.location}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Capacity</div>
                    <div className="text-gray-600">{event.currentBookings}/{event.capacity} booked</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Price</div>
                    <div className="text-gray-600">
                      {event.price === 0 ? 'Free' : `$${event.price}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <div>
                    <div className="font-medium text-gray-900">Organizer</div>
                    <div className="text-gray-600">{event.organizer?.name || 'Unknown'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div>
                <div className="font-medium text-gray-900 mb-2">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements */}
            {event.requirements && (
              <div>
                <div className="font-medium text-gray-900 mb-2">Requirements</div>
                <p className="text-gray-600">{event.requirements}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className="card">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Book This Event</h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-medium">Available Spots:</span> {availableSpots}
              </p>
              <p>
                <span className="font-medium">Price:</span> {event.price === 0 ? 'Free' : `$${event.price}`}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {isEventFull ? (
              <div className="text-center">
                <div className="text-error font-medium mb-2">Event is Full</div>
                <button disabled className="btn btn-disabled">
                  No Spots Available
                </button>
              </div>
            ) : (
              <>
                {!showBookingForm ? (
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="btn btn-primary"
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Booking Form */}
        {showBookingForm && !isEventFull && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Number of Tickets</label>
                  <select
                    className="form-input"
                    value={bookingData.numberOfTickets}
                    onChange={(e) => setBookingData(prev => ({ ...prev, numberOfTickets: parseInt(e.target.value) }))}
                    max={availableSpots}
                  >
                    {[...Array(Math.min(availableSpots, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'ticket' : 'tickets'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label">Total Price</label>
                  <div className="form-input bg-gray-50">
                    {event.price === 0 ? 'Free' : `$${event.price * bookingData.numberOfTickets}`}
                  </div>
                </div>
              </div>

              <div>
                <label className="form-label">Special Requirements (Optional)</label>
                <textarea
                  className="form-input"
                  rows="3"
                  placeholder="Any special requirements or requests..."
                  value={bookingData.specialRequirements}
                  onChange={(e) => setBookingData(prev => ({ ...prev, specialRequirements: e.target.value }))}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="btn btn-primary"
                >
                  {bookingLoading ? 'Processing...' : 'Confirm Booking'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Additional Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What to Expect</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Professional speakers and industry experts
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Hands-on workshops and interactive sessions
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Networking opportunities with peers
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Certificate of participation
            </li>
          </ul>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-3 text-gray-600">
            <div>
              <div className="font-medium">Organizer</div>
              <div>{event.organizer?.name || 'Unknown'}</div>
              <div className="text-sm">{event.organizer?.email || 'No email provided'}</div>
            </div>
            <div>
              <div className="font-medium">Location</div>
              <div>{event.location}</div>
            </div>
            <div>
              <div className="font-medium">Date & Time</div>
              <div>{formatDate(event.date)}</div>
              <div>{event.time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
