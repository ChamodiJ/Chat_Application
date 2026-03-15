import React, { useRef, useEffect } from 'react'
// Import assets (images/icons) and dummy messages
import assets, { messagesDummyData } from '../assets/assets'
// Import a helper function to format message timestamps
import { formatMessageTime } from '../lib/utils'

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  // useRef creates a reference to a DOM element
  // We'll attach this to the bottom div of the chat to auto-scroll
  const scrollEnd = useRef()

  // useEffect runs when the component mounts
  // This scrolls to the bottom of the chat automatically
  useEffect(() => {
    if (scrollEnd.current) {
      // scrollIntoView scrolls smoothly to the referenced element
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, []) // empty array → run only once when component mounts

  // If a user is selected, show the chat; otherwise show placeholder
  return selectedUser ? (
    // Main container
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>

      {/* ----- Header ----- */}
      <div className='flex items-center gap-3 py-3 px-4 border-b border-stone-500'>
        {/* User profile image */}
        <img src={assets.profile_martin} alt="" className="w-8 rounded-full" />

        {/* User name and online indicator */}
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500"></span> {/* green dot */}
        </p>

        {/* Mobile only: arrow to close chat */}
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className='md:hidden max-w-7'
        />

        {/* Desktop only: help icon */}
        <img
          src={assets.help_icon}
          alt=""
          className='max-md:hidden max-w-5'
        />
      </div>

      {/* ----- Chat Body ----- */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {/* Loop through messagesDummyData to display each message */}
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 justify-end ${
              // Reverse alignment for messages from the other user
              msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'
            }`}
          >
            {msg.image ? (
              // If the message has an image, show image
              <img
                src={msg.image}
                alt=""
                className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'
              />
            ) : (
              // Otherwise, show text message
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
                  // Adjust border rounding depending on sender
                  msg.senderId !== '680f50e4f10f3cd28382ecf9'
                    ? 'rounded-bl-none'
                    : 'rounded-br-none'
                }`}
              >
                {msg.text}
              </p>
            )}

            {/* Message avatar and timestamp */}
            <div className='text-center text-xs'>
              <img
                src={
                  msg.senderId === '680f50e4f10f3cd28382ecf9'
                    ? assets.avatar_icon // current user
                    : assets.profile_martin // other user
                }
                alt=""
                className='w-7 rounded-full'
              />
              <p className='text-gray-500'>{formatMessageTime(msg.createdAt)}</p>
            </div>
          </div>
        ))}

        {/* Invisible div at the bottom to scroll into view */}
        <div ref={scrollEnd}></div>
      </div>

      {/* ----- Bottom Input Area ----- */}
      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        {/* Text input and image upload container */}
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input
            type="text"
            placeholder='send a message'
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'
          />
          {/* Hidden file input for image upload */}
          <input type="file" id='image' accept='image/png,image/jpeg' hidden />
          <label htmlFor='image'>
            <img src={assets.gallery_icon} alt='' className='w-5 mr-2 cursor-pointer'/>
          </label>
        </div>

        {/* Send button */}
        <img src={assets.send_button} alt='' className='w-7 cursor-pointer'/>
      </div>

    </div>
  ) : (
    // ----- Placeholder UI when no user is selected -----
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} alt="" className='max-w-16' />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer