export default defineEventHandler(async (event) => {
    if (!process.dev) return { disabled: true };

    // Enable SSE endpoint
    setHeader(event, 'cache-control', 'no-cache');
    setHeader(event, 'connection', 'keep-alive');
    setHeader(event, 'content-type', 'text/event-stream');
    setResponseStatus(event, 200);

    let counter = 0;

    const sendEvent = (data: any) => {
        event.node.res.write(`id: ${++counter}\n`);
        event.node.res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // Send an event every 2 seconds
    const intervalId = setInterval(() => {
        sendEvent({ message: `Update #${counter}` });
    }, 2000);

    // Uncomment if using hooks
    // myHooks.hook('sse:event', sendEvent)

    // Clean up on client disconnect
    event.node.res.on('close', () => {
        clearInterval(intervalId);
    });

    // Let the connection open
    event._handled = true;
});
