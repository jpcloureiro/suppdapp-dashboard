import React from "react";

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
            const {
              ticketNumber,
              supportType,
              ticketState,
              commState,
              submittedBy,
              description,
            } = item;

            return (
              <tr
                key={`${index}-ticketNumber`}
                className="hover cursor-pointer"
                onClick={handleRowClick}
              >
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{ticketNumber}</div>
                      <div className="text-sm opacity-50">{supportType}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {ticketState}
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
  const buttonText = wallet ?? "Connect Wallet";

  const item = {
    ticketNumber: "Ticket 1",
    supportType: "General Support",
    ticketState: "In Progress",
    commState: "Waiting for a reply",
    submittedBy: "0x45trs5rstd44854354856456325464565412568545456x",
    description: "Cannot Buy NFT",
  };

  const items = [item, item, item, item, item, item, item, item, item];

  return (
    <div className="container mx-auto">
      <div className="container flex justify-end my-10">
        <button
          className="btn btn-primary"
          onClick={handleOnConnectWalletClick}
        >
          {buttonText}
        </button>
      </div>
      <Dash tickets={items} onRowClick={handleRowClick} />
    </div>
  );
};

export default App;
