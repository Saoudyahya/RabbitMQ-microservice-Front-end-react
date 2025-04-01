import React, { useEffect, useState } from 'react';

const RabbitmqListener = ({ value }) => {
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessages, setSelectedMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081/Notification-Rabbitmq-service');
   
    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      const newMessage = JSON.parse(event.data); // Parse the JSON message
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem('messages', JSON.stringify(updatedMessages)); // Store messages in local storage
        return updatedMessages;
      });
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Load messages from local storage on component mount
    const storedMessages = localStorage.getItem('messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    return () => {
      ws.close();
    };
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));
    return date.toLocaleString();
  };

  const clearLastTenMessages = () => {
    setMessages((prevMessages) => {
      // Filter messages with the provided value
      const filteredMessagesWithValue = prevMessages.filter(message => message.message.includes(value));

      const slicedMessagesWithValue = filteredMessagesWithValue.slice(0, -10);

      // Filter messages without the provided value
      const filteredMessagesWithoutValue = prevMessages.filter(message => !message.message.includes(value));

      // Combine the filtered messages with and without the value
      const updatedMessages = [...filteredMessagesWithoutValue, ...slicedMessagesWithValue];

      localStorage.setItem('messages', JSON.stringify(updatedMessages)); // Update local storage
      return updatedMessages;
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClickMessage = (message) => {
    setSelectedMessages((prevSelectedMessages) => {
      if (prevSelectedMessages.includes(message)) {
        return prevSelectedMessages.filter((msg) => msg !== message);
      } else if (prevSelectedMessages.length < 4) {
        return [...prevSelectedMessages, message];
      } else {
        alert('You can only select up to 4 messages');
        return prevSelectedMessages;
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedMessages([]);
  };

  const filteredMessages = messages
    .filter((message) =>
      message.message.includes(searchQuery) || message.messageId.includes(searchQuery)
    )
    .filter((message) => message.message.includes(value));

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-1/3 rounded-sm border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:w-1/3 xl:w-1/4 overflow-hidden flex flex-col">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white px-5 pt-6">
          RabbitMQ Messages
        </h4>

        <div className="mb-4 px-5">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by message or ID"
            className="px-4 py-2 border rounded w-full"
          />
        </div>

        <div className="flex-grow overflow-y-auto">
          {filteredMessages.map((message, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-4 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 ${index === filteredMessages.length - 1 ? '' : 'border-b border-gray-300 dark:border-gray-700'} ${selectedMessages.includes(message) ? 'bg-gray-300 dark:bg-gray-700' : ''}`}
              onClick={() => handleClickMessage(message)}
            >
              <div className="flex flex-col">
                <span className="text-black dark:text-white font-semibold">{message.action}</span>
                <span className="text-gray-600 dark:text-gray-400">{message.message}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-600 dark:text-gray-400">{formatDate(message.massageDate)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-4">
          <button
            onClick={clearLastTenMessages}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 w-full mb-2"
          >
            Clear Last 10 Messages
          </button>
          <button
            onClick={handleClearSelection}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
          >
            Clear Selection
          </button>
        </div>
      </div>

      <div className="w-2/3 p-6 bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-700 shadow-lg sm:w-2/3 xl:w-3/4 flex flex-col">
        {selectedMessages.length > 0 ? (
          <div className="space-y-4">
            {selectedMessages.map((message, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-900 shadow-lg">
                <h5 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2">Message Details</h5>
                <p><strong className="text-black-500 dark:text-black-400">Action:</strong> <span className="text-black dark:text-white">{message.action}</span></p>
                <p><strong className="text-black-500 dark:text-black-400">Message:</strong> <span className="text-   dark:text-white">{message.message}</span></p>
                <p><strong className="text-black-500 dark:text-black-400">Message ID:</strong> <span className="text-black dark:text-white">{message.messageId}</span></p>
                <p><strong className="text-black-500 dark:text-black-400">Date:</strong> <span className="text-black dark:text-white">{formatDate(message.massageDate)}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-black dark:text-white">
            <p>Select a message to view its details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RabbitmqListener;
