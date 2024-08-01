"use client";

import React from 'react';
import { XIcon } from '@heroicons/react/outline';

export const Modal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return React.createElement(
    'div',
    { className: 'fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50' },
    React.createElement(
      'div',
      { className: 'bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-6 w-11/12 md:w-1/3' },
      React.createElement(
        'div',
        { className: 'flex justify-between items-center pb-4 border-b border-gray-200' },
        React.createElement('h3', { className: 'text-lg font-semibold text-white' }, 'Add New Product'),
        React.createElement(
          'button',
          { onClick: onClose, className: 'text-white hover:text-gray-300' },
          React.createElement(XIcon, { className: 'h-6 w-6' })
        )
      ),
      React.createElement(
        'div',
        { className: 'pt-4' },
        React.createElement(
          'form',
          { onSubmit: onSave, className: 'space-y-4' },
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'name', className: 'block text-sm font-medium text-gray-200' },
              'Product Name'
            ),
            React.createElement('input', {
              id: 'name',
              type: 'text',
              placeholder: 'Enter product name',
              className: 'mt-1 block w-full bg-transparent border border-gray-300 rounded-md shadow-sm focus:border-white focus:ring focus:ring-white focus:ring-opacity-50 text-white',
              required: true,
            })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'quantity', className: 'block text-sm font-medium text-gray-200' },
              'Quantity Left'
            ),
            React.createElement('input', {
              id: 'quantity',
              type: 'number',
              placeholder: 'Enter quantity',
              className: 'mt-1 block w-full bg-transparent border border-gray-300 rounded-md shadow-sm focus:border-white focus:ring focus:ring-white focus:ring-opacity-50 text-white',
              required: true,
            })
          ),
          React.createElement(
            'div',
            null,
            React.createElement(
              'label',
              { htmlFor: 'price', className: 'block text-sm font-medium text-gray-200' },
              'Price'
            ),
            React.createElement('input', {
              id: 'price',
              type: 'number',
              placeholder: 'Enter price',
              className: 'mt-1 block w-full bg-transparent border border-gray-300 rounded-md shadow-sm focus:border-white focus:ring focus:ring-white focus:ring-opacity-50 text-white',
              required: true,
            })
          ),
          React.createElement(
            'div',
            { className: 'flex justify-end space-x-2' },
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: onClose,
                className: 'bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600',
              },
              'Cancel'
            ),
            React.createElement(
              'button',
              {
                type: 'submit',
                className: 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700',
              },
              'Save'
            )
          )
        )
      )
    )
  );
};

