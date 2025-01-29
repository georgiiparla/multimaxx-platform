import { Box, Button, Textarea } from "@mantine/core";
import { IconSend2 } from "@tabler/icons-react";

interface MessageInputProps {
  message: string;
  setMessage: (value: string) => void;
  sendMessage: () => void;
}

export const MessageInput = ({
  message,
  setMessage,
  sendMessage,
}: MessageInputProps) => (
  <Box
    style={{
      padding: "1rem",
      borderRadius: "12px",
      border: "1px solid var(--mantine-color-border, #d4d4d4)",
      marginTop: "1rem",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "0.5rem",
    }}
  >
    <Textarea
      placeholder="Type your message..."
      variant="unstyled"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      autosize
      minRows={2}
      maxRows={6}
      style={{ flex: 1, maxHeight: "150px", overflowY: "auto" }}
    />
    <Button
      onClick={sendMessage}
      variant="filled"
      color="orange"
      style={{ height: "40px", padding: "0 10px" }}
      radius="xl"
      className="dark:invert"
    >
      <IconSend2 size={20} stroke={2} />
    </Button>
  </Box>
);
