import React from "react";
import Modal from "./Modal";

const Dash = ({ tickets, onRowClick }) => {
  const handleRowClick = (ticketId) => {
    console.log(`row of ticket ${ticketId} pressed`);
    console.log("open modal");
    onRowClick(ticketId);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Ticket #</th>
            <th>state</th>
            <th>submitted by</th>
            <th>description</th>
            <th>created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((item, index) => {
            const { id, type, state, commState, submittedBy, description } =
              item;

            return (
              <tr
                key={`${index}-ticketNumber`}
                className="hover cursor-pointer"
                onClick={handleRowClick}
              >
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{id}</div>
                      <div className="text-sm opacity-50">{type}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {state}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {commState}
                  </span>
                </td>
                <td>{submittedBy}</td>
                <td>
                  <div className="font-bold">{description}</div>
                </td>
                <td>{Date.now()}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>Ticket #</th>
            <th>state</th>
            <th>submitted by</th>
            <th>description</th>
            <th>created</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const App = () => {
  const [wallet, setWallet] = React.useState();
  const [modalVisibility, setModalVisibility] = React.useState(false);

  const handleOnConnectWalletClick = async () => {
    const { ethereum } = window;
    const [mmWallet] = await ethereum.request({
      method: "eth_requestAccounts",
    });

    setWallet(mmWallet);
  };
  const handleRowClick = () => {
    setModalVisibility(!modalVisibility);
  };

  const handleCloseModal = () => {
    console.log("lets close");
    setModalVisibility(false);
  };

  const buttonText = wallet ?? "Connect Wallet";

  const ticket = {
    id: "Ticket 1",
    type: "General Support",
    state: "In Progress",
    commState: "Waiting for a reply",
    submittedBy: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    description: "Cannot Buy NFT",
  };

  const userMessage = {
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    timestamp: Date.now(),
    content: "Hello, I need help",
  };
  const myMessage = {
    walletAddress: "0xc0c8E364363cf4d032eD2D2f62d8e48BB2D84420",
    timestamp: Date.now(),
    content: "Hi, how can I help you",
  };

  const ticketDetails = {
    id: 1,
    title: "Cannot Buy NFT",
    description: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    messages: [userMessage, myMessage, userMessage, myMessage, userMessage],
  };

  const tickets = [
    ticket,
    ticket,
    ticket,
    ticket,
    ticket,
    ticket,
    ticket,
    ticket,
    ticket,
  ];

  return (
    <div>
      <div className="container mx-auto">
        <div className="container flex justify-end my-10">
          <button
            className="btn btn-primary"
            onClick={handleOnConnectWalletClick}
          >
            {buttonText}
          </button>
        </div>
        <Dash tickets={tickets} onRowClick={handleRowClick} />
      </div>
      <Modal
        isVisible={modalVisibility}
        onClose={handleCloseModal}
        ticket={ticketDetails}
      />
    </div>
  );
};

export default App;
