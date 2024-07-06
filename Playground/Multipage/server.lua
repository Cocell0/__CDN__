local socket = require("socket")

-- Create a TCP socket and bind it to the local host, at port 12345
local server = assert(socket.bind("127.0.0.1", 12345))

-- Print the IP and port we're listening on
local ip, port = server:getsockname()
print("Server listening on " .. ip .. ":" .. port)

while true do
    -- Wait for a connection from any client
    local client = server:accept()
    
    -- Make sure we don't block waiting for this client's line
    client:settimeout(10)
    
    -- Receive the line
    local line, err = client:receive()
    if not err then
        print("Received from client: " .. line)
        
        -- Send a response back to the client
        client:send("Thank you for connecting\n")
    end
    
    -- Done with client, close the object
    client:close()
end
