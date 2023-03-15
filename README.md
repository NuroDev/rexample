<div align="center">
  <h1>
    <br/>
    <br/>
    ❗
    <br />
    rexample
    <br />
    <br />
    <br />
    <br />
  </h1>
  <sup>
    <br />
    Simple CLI to execute & run scripts</em>
    <br />
    <br />
  </sup>
  <br />
  <br />
</div>

## 🚀 Install

You have a few options to install the CLI:

```bash
# Locally
npm install --save-dev rexample

# Globally
npm install -g rexample

# npx
npx rexample
```

## 🦄 Usage

To get started using the CLI simply create a new example script you want to run.

The only requirement is that the script exports a default function to execute. The reason for this is due to avoid module import automatic code execution.

For example, here is a basic script that will log "Hello world!" to the console:

```typescript
// examples/basic.ts
function main() {
  console.log("Hello world!");
}

export default main;
```

Then simply run the CLI, either by passing in the name of the file or by selecting it from the list:

```bash
# Run the CLI & select a script to run
rexample

# Run the CLI using a provided script name
rexample <script>
```

And you will get the the output of your selected script:

```bash
Hello world!
```
