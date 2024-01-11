import { useState } from "react";

const useReciepientData = () => {
  const [recipientName, setRecipientName] = useState<String>();
  const [recipientId, setRecipientId] = useState<number>();

  const setRecipientData = (recipientName: string, recipientId: number) => {
    setRecipientName(recipientName);
    setRecipientId(recipientId);
  };
  return { recipientId, recipientName, setRecipientData };
};

export default useReciepientData;
