import { LSP6Signer } from "../src/index.js";

describe("Hash message function", () => {
  const lsp6Signer = new LSP6Signer();
  const hash = lsp6Signer.hashMessage("hello");
  it("should be hexadecimal", () => {
    expect(hash.substring(0, 2)).toBe("0x");
  });
  it("should create a hash of 32 bites", () => {
    expect(hash.length).toBe(66);
  });
});

describe("Sign transaction function", () => {
  const lsp6Signer = new LSP6Signer();
  const signingKey =
    "ffeb17b9a6059fec3bbab63d76b060b7380cac7a62ce6621a134531a46458968";
  const signedObject = lsp6Signer.sign("hello", signingKey);
  it("should give back an object with the right properties", () => {
    expect(signedObject).toHaveProperty("message");
    expect(signedObject).toHaveProperty("messageHash");
    expect(signedObject).toHaveProperty("v");
    expect(signedObject).toHaveProperty("r");
    expect(signedObject).toHaveProperty("s");
    expect(signedObject).toHaveProperty("signature");
  });
});

describe("Recover the address function of a transaction", () => {
  const lsp6Signer = new LSP6Signer();
  const signingKey =
    "ffeb17b9a6059fec3bbab63d76b060b7380cac7a62ce6621a134531a46458968";
  const signingAddress = "0x2b389f8EB52D16A105e02165a2AC1450461A237b";
  const messageInfo = lsp6Signer.sign("hello", signingKey);
  const message = messageInfo.message;
  const signature = messageInfo.signature;
  const isMessagePrefixed = false;
  const recoveredAddress = lsp6Signer.recover(
    message,
    signature,
    isMessagePrefixed
  );
  it("should recover the signing address of a transaction from the private key", () => {
    expect(recoveredAddress).toBe(signingAddress);
  });
});
