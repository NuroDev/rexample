const setTimeoutAsync = <
  TCallback extends Function = () => void | Promise<void>
>(
  callback: TCallback,
  delay: number
) => new Promise((resolve) => setTimeout(() => resolve(callback()), delay));

async function main() {
  await setTimeoutAsync(() => console.log("Hello world after 1000ms"), 1000);
}

export default main;
