import React from "react";

// TODO: remove test const
const MY_WALLET_STORAGE = "0xc0c8E364363cf4d032eD2D2f62d8e48BB2D84420";

const emptyState = {
  name: "",
  message: "",
  timestamp: "",
};

const emptyTicket = {
  title: "",
  description: "",
  states: [],
};

const Message = ({ message }) => {
  const { walletAddress, timestamp, content } = message;

  // TODO: Save auth walletAddress on localstorage & hydrate react context with it
  const isMyOwnMessage = walletAddress === MY_WALLET_STORAGE;

  const messsagesAlignment = isMyOwnMessage
    ? "place-self-end"
    : "place-self-start";

  const messageColor = isMyOwnMessage ? "badge-accent" : "badge-primary";

  return (
    <div className={`${messsagesAlignment} space-y-2`}>
      <div>
        <div className={`badge text-lg ${messageColor}`}>{content}</div>
        <h5 className="text-sm">{timestamp}</h5>
      </div>
    </div>
  );
};

const MessageList = ({ messages }) => (
  <ul className="space-y-6 grid grid-cols-1">
    {messages && messages.map((message) => <Message message={message} />)}
  </ul>
);

export default function Modal({ isVisible, onClose, ticket }) {
  const hasTicket = Boolean(ticket);
  const shouldRender = isVisible && hasTicket;
  const classNames = shouldRender ? "modal modal-open" : "modal";

  const handleChangeInput = (event) => {
    console.log(event)
  }

  return (
    <div className={classNames}>
      <div className="modal-box relative w-full">
        <label
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onClose}
        >
          x
        </label>
        <h3 className="font-bold text-lg">{ticket?.title}</h3>
        <p className="py-4">{ticket?.description}</p>
        <MessageList messages={ticket.messages} />
        <div className="flex items-center mt-5">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full self-ent mr-2"
          onChange={handleChangeInput}
        />
        <button class="btn btn-circle">&gt;</button>
        </div>
      </div>
    </div>
  );
}
