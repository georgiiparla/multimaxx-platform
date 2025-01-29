import { Box, Paper, ScrollArea, Text } from "@mantine/core";

interface Message {
  text: string;
  sender: string;
}

export const MessagesList = ({ messages }: { messages: Message[] }) => (
  <Paper
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      borderRadius: "12px",
      border: "1px solid var(--mantine-color-border, #d4d4d4)",
    }}
  >
    <ScrollArea
      style={{
        flex: 1,
        padding: "1rem",
        overflowX: "hidden",
      }}
    >
      <Box
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            style={{
              marginBottom: "1rem", // Увеличенный отступ между сообщениями
              display: "flex",
              justifyContent: msg.sender === "You" ? "flex-end" : "flex-start", // Выравнивание по отправителю
            }}
          >
            <Paper
              withBorder
              style={{
                display: "inline-block",
                padding: "0.5rem 1rem",
                backgroundColor:
                  msg.sender === "You"
                    ? "var(--mantine-color-blue-light)"
                    : "var(--mantine-color-gray-light)",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                maxWidth: "80%", // Ограничение ширины сообщения
              }}
            >
              <Text size="sm" c="dimmed" style={{ marginBottom: "0.25rem" }}>
                {msg.sender}
              </Text>
              <Text>{msg.text}</Text>
            </Paper>
          </Box>
        ))}
      </Box>
    </ScrollArea>
  </Paper>
);
