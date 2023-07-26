# Rollup Starter

This is the first-stop for developers building on Rollkit.

## Prerequisites

* Docker running on your machine

## Clone the repo

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

```bash
git clone https://github.com/rollkit/gm-starter.git
```

## Change into the repo's directory

Now, change into the `$HOME/gm-starter` repository:

```bash
cd gm-starter
```

## Run a local-celestia-devnet

```bash
docker run --platform linux/amd64 -p 26657:26657 -p 26659:26659 -p 26658:26658 ghcr.io/rollkit/local-celestia-devnet:v0.11.0-rc8
```

When passing the --rollkit.da_config flag later in the tutorial, it will require auth_token to be passed in. The auth token with write permission is required to submit blobs and can be obtained from the logs on local-celestia-devnet before the bridge node starts.

```bash
WARNING: Keep this auth token secret **DO NOT** log this auth token outside of development. CELESTIA_NODE_AUTH_TOKEN=

WARNING: Celestia custom network specified. Only use this option if the node is freshly created and initialized.
**DO NOT** run a custom network over an already-existing node store!

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIiwid3JpdGUiLCJhZG1pbiJdfQ.a_-CStbScoe_ot8Z1K9YaccvhngeieiSBdgO4uObuvI // [!code focus]
```

The auth token is the last string, which you can now set as a variable. (It's long, so don't forget to copy the whole thing!):

```bash
export AUTH_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIiwid3JpdGUiLCJhZG1pbiJdfQ.a_-CStbScoe_ot8Z1K9YaccvhngeieiSBdgO4uObuvI
```

## Start the Starter Rollup

```bash
bash init-local.sh
```

## Congratulations

The rollup logs will begin to look similar to this:

```bash
3:35PM INF submitting block to DA layer height=1 module=BlockManager
3:35PM INF successfully submitted Rollkit block to DA layer daHeight=148 module=BlockManager rollkitHeight=1
3:35PM INF commit synced commit=436F6D6D697449447B5B3230302031373020313933203836203730203334203139302031353220383220313432203133342034382032333520343920363220313720323131203133312032343720313133203634203933203134372032332031353920323435203931203133342031342031333520323138203138355D3A317D
3:35PM INF indexed block height=1 module=txindex
```
