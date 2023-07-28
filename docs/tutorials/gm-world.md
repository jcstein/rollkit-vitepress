# GM world rollup

## ☀️ Introduction {#introduction}

In this tutorial, we will build a sovereign `gm-world` rollup using Rollkit
and Celestia’s data availability and consensus layer to submit Rollkit blocks.

This tutorial will cover setting up Ignite CLI,
building a Cosmos-SDK application-specific rollup blockchain,
and posting data to Celestia.
First, we will test on a local DA network and then we will deploy to a live
testnet.

The [Cosmos SDK](https://github.com/cosmos/cosmos-sdk) is a framework for
building blockchain applications. The Cosmos Ecosystem uses
[Inter-Blockchain Communication (IBC)](https://github.com/cosmos/ibc-go)
to allow blockchains to communicate with one another.

The development journey for your rollup will look something like this:

1. [Part one](#part-one): Run your rollup and post DA to a local devnet, and make sure everything works as expected
2. [Part two](#part-two): Deploy the rollup, posting to a DA testnet. Confirm again that everything is functioning properly
3. Coming soon: Deploy your rollup to the DA layer's mainnet

:::tip
This tutorial will explore developing with Rollkit,
which is still in Alpha stage. If you run into bugs, please write a Github
[Issue ticket](https://github.com/rollkit/docs/issues/new)
or let us know in our [Telegram](https://t.me/rollkit).
:::

:::warning
The script for this tutorial is built for Celestia's
[Arabica devnet](https://docs.celestia.org/nodes/arabica-devnet).
:::

## Table of Contents {#toc}

[[toc]]

## 🤔 What is GM? {#what-is-gm}

GM means good morning. It's GM o'clock somewhere, so there's never a bad time
to say GM, Gm, or gm. You can think of "GM" as the new version of
"hello world".

## Dependencies {#dependencies}

* Operating systems: GNU/Linux or macOS
* [Golang](https://go.dev)
* [Ignite CLI v0.26.1](https://github.com/ignite/cli)
* [Homebrew](https://brew.sh)
* [wget](https://www.gnu.org/software/wget)
* [jq](https://stedolan.github.io/jq)
* [A Celestia Light Node](https://docs.celestia.org/nodes/light-node)


:::tip
If you are only planning to complete [Part one](#part-one),
feel free to skip to the [Part two](#part-two).

Be sure to use the same testnet installation instructions through this
entire tutorial.
:::

## Linux setup

### 🏃 Install Golang on Linux {#install-golang-linux}

[Celestia-App](https://github.com/celestiaorg/celestia-app),
[Celestia-Node](https://github.com/celestiaorg/celestia-node),
and [Cosmos-SDK](https://github.com/cosmos/cosmos-sdk) are
written in the Golang programming language. You will need
Golang to build and run them.

You can [install Golang here](https://docs.celestia.org/nodes/environment#install-golang).

### 🔥 Install Ignite CLI on Linux {#install-ignite-cli-linux}

First, you will need to create `/usr/local/bin` if you have not already:

```bash
sudo mkdir -p -m 775 /usr/local/bin
```

Run this command in your terminal to install Ignite CLI:

```bash
curl https://get.ignite.com/cli@v0.26.1! | bash
```

:::tip
✋ On some machines, you may run into permissions errors like the one below.
You can resolve this error by following the guidance
[here](https://docs.ignite.com/v0.25.2/guide/install#write-permission) or below.
:::

```bash
# Error
jcs @ ~ % curl https://get.ignite.com/cli@v0.26.1! | bash


  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3967    0  3967    0     0  16847      0 --:--:-- --:--:-- --:--:-- 17475
Installing ignite v0.26.1..... // [!code focus]
######################################################################## 100.0% // [!code focus]
mv: rename ./ignite to /usr/local/bin/ignite: Permission denied // [!code focus]
============ // [!code focus]
Error: mv failed // [!code focus]
```

The following command will resolve the permissions error:

```bash
sudo curl https://get.ignite.com/cli@v0.26.1! | sudo bash
```

A successful installation will return something similar the response below:

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3967    0  3967    0     0  15586      0 --:--:-- --:--:-- --:--:-- 15931
Installing ignite v0.26.1..... // [!code focus]
######################################################################## 100.0% // [!code focus]
Installed at /usr/local/bin/ignite // [!code focus]
```

Verify you’ve installed Ignite CLI by running:

```bash
ignite version
```

The response that you receive should look something like this:

```bash
jcs @ ~ % ignite version // [!code focus]
Ignite CLI version: v0.26.1 // [!code focus]
Ignite CLI build date: 2022-10-20T15:52:00Z
Ignite CLI source hash: cc393a9b59a8792b256432fafb472e5ac0738f7c
Cosmos SDK version: v0.46.3
Your OS: darwin
Your arch: arm64
Your Node.js version: v18.10.0
Your go version: go version go1.19.2 darwin/arm64
Your uname -a: Darwin Joshs-MacBook-Air.local 21.6.0 Darwin Kernel Version 21.6.0: Mon Aug 22 20:20:07 PDT 2022; root:xnu-8020.140.49~2/RELEASE_ARM64_T8110 arm64
Your cwd: /Users/joshstein
Is on Gitpod: false
```

## macOS setup

:::tip
If you are only planning to complete [Part one](#part-one),
feel free to skip to the [Part two](#part-two).

Be sure to use the same testnet installation instructions through this
entire tutorial.
:::

### 🏃 Install Golang on macOS {#install-golang-mac}

[Celestia-App](https://github.com/celestiaorg/celestia-app),
[Celestia-Node](https://github.com/celestiaorg/celestia-node),
and [Cosmos-SDK](https://github.com/cosmos/cosmos-sdk) are
written in the Golang programming language. You will need
Golang to build and run them.

You can [install Golang here](https://docs.celestia.org/nodes/environment#install-golang).

#### 🔥 Install Ignite CLI on macOS {#install-ignite-mac}

First, you will need to create `/usr/local/bin` if you have not already:

```bash
sudo mkdir -p -m 775 /usr/local/bin
```

Run this command in your terminal to install Ignite CLI:

```bash
curl https://get.ignite.com/cli@v0.26.1! | bash
```

:::tip
✋ On some machines, you may run into permissions errors like the one below.
You can resolve this error by following the guidance
[here](https://docs.ignite.com/v0.25.2/guide/install#write-permission) or below.
:::

```bash
# Error
jcs @ ~ % curl https://get.ignite.com/cli@v0.26.1! | bash


  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3967    0  3967    0     0  16847      0 --:--:-- --:--:-- --:--:-- 17475
Installing ignite v0.26.1..... // [!code focus]
######################################################################## 100.0% // [!code focus]
mv: rename ./ignite to /usr/local/bin/ignite: Permission denied // [!code focus]
============ // [!code focus]
Error: mv failed // [!code focus]
```

The following command will resolve the permissions error:

```bash
sudo curl https://get.ignite.com/cli@v0.26.1! | sudo bash
```

A successful installation will return something similar the response below:

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3967    0  3967    0     0  15586      0 --:--:-- --:--:-- --:--:-- 15931
Installing ignite v0.26.1..... // [!code focus]
######################################################################## 100.0% // [!code focus]
Installed at /usr/local/bin/ignite // [!code focus]
```

Verify you’ve installed Ignite CLI by running:

```bash
ignite version
```

The response that you receive should look something like this:

```bash
jcs @ ~ % ignite version // [!code focus]
Ignite CLI version:  v0.26.1 // [!code focus]
Ignite CLI build date:  2023-01-24T18:50:18Z
Ignite CLI source hash:  d2a2e287c176ba010557f0b8fbaa198cdeee928d
Ignite CLI config version: v1
Cosmos SDK version:  v0.46.7
Your OS:   darwin
Your arch:   arm64
Your Node.js version:  v16.15.1
Your go version:  go version go1.20.2 darwin/arm64
Your uname -a:   Darwin Joshs-Air 22.5.0 Darwin Kernel Version 22.5.0: Thu Jun  8 22:21:34 PDT 2023; root:xnu-8796.121.3~7/RELEASE_ARM64_T8112 arm64
Your cwd:   /Users/joshstein
Is on Gitpod:   false
```

### 🍺 Install Homebrew on macOS {#install-homebrew-mac}

Homebrew will allow us to install dependencies for our Mac:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Be sure to run the commands similar to the output below from the successful installation:

```bash
==> Next steps:
- Run these three commands in your terminal to add Homebrew to your PATH:
    echo '# Set PATH, MANPATH, etc., for Homebrew.' >> /Users/joshstein/.zprofile
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/joshstein/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 🏃 Install wget and jq on macOS {#install-wget-jq-mac}

wget is an Internet file retriever and jq is a lightweight and flexible
command-line JSON processor.

```bash
brew install wget && brew install jq
```

## Part one

This part of the tutorial will teach developers how to easily run a local data availability (DA) devnet on their own machine (or in the cloud).
**Running a local devnet for DA to test your rollup is the recommended first step before deploying to a testnet.**
This eliminates the need for testnet tokens and deploying to a testnet until you are ready.

:::warning
Part one of the tutorial has only been tested on an AMD machine running Ubuntu 22.10 x64.
:::

Whether you're a developer simply testing things on your laptop or using a virtual machine in the cloud,
this process can be done on any machine of your choosing. We tested out the Devnet section (Part one) on a machine with the following specs:

* Memory: 1 GB RAM
* CPU: Single Core AMD
* Disk: 25 GB SSD Storage
* OS: Ubuntu 22.10 x64

### 💻 Prerequisites {#prerequisites}

* [Docker](https://docs.docker.com/get-docker) installed on your machine

### 🏠 Running local devnet with a Rollkit rollup {#running-local-devnet-rollup}

First, run the [`local-celestia-devnet`](https://github.com/rollkit/local-celestia-devnet) by running the following command:

```bash
docker run --platform linux/amd64 -p 26657:26657 -p 26659:26659 -p 26658:26658 ghcr.io/rollkit/local-celestia-devnet:v0.11.0-rc8
```

When passing the `--rollkit.da_config` flag later in the tutorial,
it will require `auth_token` to be passed in. The auth token with
write permission is required to submit blobs and can be obtained
from the logs on local-celestia-devnet before the bridge node starts.

```bash
WARNING: Keep this auth token secret **DO NOT** log this auth token outside of development. CELESTIA_NODE_AUTH_TOKEN=

WARNING: Celestia custom network specified. Only use this option if the node is freshly created and initialized.
**DO NOT** run a custom network over an already-existing node store!

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIiwid3JpdGUiLCJhZG1pbiJdfQ.a_-CStbScoe_ot8Z1K9YaccvhngeieiSBdgO4uObuvI // [!code focus]
```

The auth token is the last string, which you can now set as a variable.
(It's long, so don't forget to copy the whole thing!):

```bash
export AUTH_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJwdWJsaWMiLCJyZWFkIiwid3JpdGUiLCJhZG1pbiJdfQ.a_-CStbScoe_ot8Z1K9YaccvhngeieiSBdgO4uObuvI
```

### 🔎 Query your balance {#query-your-balance}

Open a new terminal instance. Check the balance on your account that you'll be using to post blocks to the
local network, this will make sure you can post rollup blocks to your Celestia Devnet for DA & consensus:

```bash
curl -X GET http://0.0.0.0:26659/balance
```

<!-- markdownlint-disable MD033 -->
You will see something like this, denoting your balance in TIA x 10<sup>-6</sup>:
<!-- markdownlint-enable MD033 -->

```bash
{"denom":"utia","amount":"999995000000000"}
```

If you want to be able to transpose your JSON results in a nicer format, you can install [`jq`](https://stedolan.github.io/jq/):

```bash
sudo apt install jq
```

:::tip
We'll need `jq` later, so install it!
:::

Then run this to prettify the result:

```bash
curl -X GET http://0.0.0.0:26659/balance | jq
```

Here's what my response was when I wrote this:

```bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    43  100    43    0     0   1730      0 --:--:-- --:--:-- --:--:--  1791
{ // [!code focus]
  "denom": "utia", // [!code focus]
  "amount": "999995000000000" // [!code focus]
} // [!code focus]
```

If you want to clean it up some more, you can use the `-s` option to run `curl` in silent mode and not print the progress metrics:

```bash
curl -s -X GET http://0.0.0.0:26659/balance | jq
```

Your result will now look like this, nice 🫡

```bash
{
  "denom": "utia",
  "amount": "999995000000000"
}
```

### 🏗️ Building your sovereign rollup {#building-your-sovereign-rollup}

Now that you have a Celestia devnet running, you are ready to install Golang. We will use Golang to build and run our Cosmos-SDK blockchain.

The Ignite CLI comes with scaffolding commands to make development of
blockchains quicker by creating everything that is needed to start a new
Cosmos SDK blockchain.

[Install Golang](https://docs.celestia.org/nodes/environment#install-golang) (*these commands are for amd64/linux*):

```bash
cd $HOME
ver="1.19.1"
wget "https://golang.org/dl/go$ver.linux-amd64.tar.gz"
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf "go$ver.linux-amd64.tar.gz"
rm "go$ver.linux-amd64.tar.gz"
echo "export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin" >> $HOME/.bash_profile
source $HOME/.bash_profile
go version
```

Now, use the following command to install Ignite CLI, if you
have not already:

```bash
curl https://get.ignite.com/cli@v0.26.1! | bash
```

:::tip
If you have issues with installation, the full guide can be found [here](https://get.ignite.com/cli) or on [docs.ignite.com](https://docs.ignite.com).
The above command was tested on `amd64/linux`.
:::

Check your version:

```bash
ignite version
```

Open a new tab or window in your terminal and run this command to
scaffold your rollup. Scaffold the chain:

```bash
cd $HOME
ignite scaffold chain gm --address-prefix gm
```

:::tip
The `--address-prefix gm` flag will change the address prefix from `cosmos` to `gm`. Read more on the [Cosmos docs](https://docs.cosmos.network/v0.46/basics/accounts.html).
:::

The response will look similar to below:

```bash
jcs @ ~ % ignite scaffold chain gm --address-prefix gm

⭐️ Successfully created a new blockchain 'gm'. // [!code focus]
👉 Get started with the following commands: // [!code focus]

 % cd gm // [!code focus]
 % ignite chain serve // [!code focus]

Documentation: https://docs.ignite.com
```

This command has created a Cosmos SDK blockchain in the `gm` directory. The
`gm` directory contains a fully functional blockchain. The following standard
Cosmos SDK [modules](https://docs.cosmos.network/main/modules) have been
imported:

* `staking` - for delegated Proof-of-Stake (PoS) consensus mechanism
* `bank` - for fungible token transfers between accounts
* `gov` - for on-chain governance
* `mint` - for minting new units of staking token
* `nft` - for creating, transferring, and updating NFTs
* and [more](https://docs.cosmos.network/main/architecture/adr-043-nft-module.html)

Change to the `gm` directory:

```bash
cd gm
```

You can learn more about the `gm` directory’s file structure [here](https://docs.ignite.com/v0.25.2/guide/hello#blockchain-directory-structure).
Most of our work in this tutorial will happen in the `x` directory.

### 🗞️ Install Rollkit {#install-rollkit}

To swap out Tendermint for Rollkit, run the following command
from inside the `gm` directory:

```bash
go mod edit -replace github.com/cosmos/cosmos-sdk=github.com/rollkit/cosmos-sdk@v0.46.13-rollkit-v0.9.0-no-fraud-proofs
go mod edit -replace github.com/tendermint/tendermint=github.com/rollkit/cometbft@v0.0.0-20230524013049-75272ebaee38
go mod tidy
go mod download
```

### ▶️ Start your rollup {#start-your-rollup}

Download the `init.sh` script to start the chain:

```bash
# From inside the `gm` directory
wget https://raw.githubusercontent.com/rollkit/docs/main/docs/scripts/gm/init-local.sh
```

Run the `init-local.sh` script:

```bash
bash init-local.sh
```

This will start your rollup, connected to the local Celestia devnet you have running.

Now let's explore a bit.

#### 🔑 Keys {#keys}

List your keys:

```bash
gmd keys list --keyring-backend test
```

You should see an output like the following

```bash
- address: gm1sa3xvrkvwhktjppxzaayst7s7z4ar06rk37jq7 // [!code focus]
  name: gm-key-2 // [!code focus]
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AlXXb6Op8DdwCejeYkGWbF4G3pDLDO+rYiVWKPKuvYaz"}'
  type: local
- address: gm13nf52x452c527nycahthqq4y9phcmvat9nejl2 // [!code focus]
  name: gm-key // [!code focus]
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AwigPerY+eeC2WAabA6iW1AipAQora5Dwmo1SnMnjavt"}'
  type: local
```

#### 💸 Transactions {#transactions}

Now we can test sending a transaction from one of our keys to the other. We can do that with the following command:

```bash
gmd tx bank send [from_key_or_address] [to_address] [amount] [flags]
```

Set your keys as variables to make it easier to add the address:

```bash
export KEY1=gm1sa3xvrkvwhktjppxzaayst7s7z4ar06rk37jq7
export KEY2=gm13nf52x452c527nycahthqq4y9phcmvat9nejl2
```
<!-- markdownlint-disable MD051 -->
So using our information from the [keys](#keys) command, we can construct the transaction command like so to send 42069stake from one address to another:
<!-- markdownlint-enable MD051 -->

```bash
gmd tx bank send $KEY1 $KEY2 42069stake --keyring-backend test
```

You'll be prompted to accept the transaction:

```bash
auth_info:
  fee:
    amount: []
    gas_limit: "200000"
    granter: ""
    payer: ""
  signer_infos: []
  tip: null
body:
  extension_options: []
  memo: ""
  messages:
  - '@type': /cosmos.bank.v1beta1.MsgSend
    amount:
    - amount: "42069"
      denom: stake
    from_address: gm1sa3xvrkvwhktjppxzaayst7s7z4ar06rk37jq7
    to_address: gm13nf52x452c527nycahthqq4y9phcmvat9nejl2
  non_critical_extension_options: []
  timeout_height: "0"
signatures: []
confirm transaction before signing and broadcasting [y/N]: // [!code focus]
```

Type `y` if you'd like to confirm and sign the transaction. Then, you'll see the confirmation:

```bash
code: 0
codespace: ""
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: '[]'
timestamp: ""
tx: null
txhash: 677CAF6C80B85ACEF6F9EC7906FB3CB021322AAC78B015FA07D5112F2F824BFF
```

#### ⚖️ Balances {#balances}

Then, query your balance:

```bash
gmd query bank balances $KEY2
```

This is the key that received the balance, so it should have increased past the initial `STAKING_AMOUNT`:

```bash
balances: // [!code focus]
- amount: "10000000000000000000042069" // [!code focus]
  denom: stake
pagination:
  next_key: null
  total: "0"
```

The other key, should have decreased in balance:

```bash
gmd query bank balances $KEY1
```

Response:

```bash
balances: // [!code focus]
- amount: "9999999999999999999957931" // [!code focus]
  denom: stake
pagination:
  next_key: null
  total: "0"
```

## Part two

### 🛑 Stopping our local devnet rollup {#stop-your-local-devnet}

First, you will need to stop your current devnet version of the gm rollup.
Follow instructions to stop the container below.

Find the Container ID that is running by using the command:

```bash
docker ps
```

Then stop the container:

```bash
docker stop CONTAINER_ID_or_NAME
```

#### 🟢 Restarting your container {#restart-your-container}

Optionally, if you'd like to restart your container, you can use the `docker start` command followed by the container ID or name.

You can obtain the container ID or name of a stopped container using the `docker ps -a` command, which will list all containers (running and stopped) and their details. For example:

```bash
docker ps -a
```

This will give you an output similar to this:

```bash
CONTAINER ID   IMAGE                                            COMMAND            CREATED         STATUS         PORTS                                                                                                                         NAMES
d9af68de54e4   ghcr.io/rollkit/local-celestia-devnet:v0.9.1   "/entrypoint.sh"   5 minutes ago   Up 2 minutes   1317/tcp, 9090/tcp, 0.0.0.0:26657->26657/tcp, :::26657->26657/tcp, 26656/tcp, 0.0.0.0:26659->26659/tcp, :::26659->26659/tcp   musing_matsumoto
```

In this example, you can restart the container using either its container ID (`d9af68de54e4`) or name (`musing_matsumoto`). To restart the container, run:

```bash
docker start d9af68de54e4
```

or

```bash
docker start musing_matsumoto
```

#### 🗑️ Removing your container {#removing-your-container}

If you ever would like to remove the container, you can use the `docker rm` command followed by the container ID or name.

Here is an example:

```bash
docker rm CONTAINER_ID_or_NAME
```

### 🪶 Run a Celestia light node {#run-celestia-node}

Follow instructions to install and start your Celestia data availability
layer light node selecting the Arabica network. You can
find instructions to install and run the node [here](https://docs.celestia.org/nodes/light-node).

After you have Go and Ignite CLI installed, and your Celestia Light
Node running on your machine, you're ready to build, test, and launch your own
sovereign rollup.

An example start command on `arabica-9` would look like this:

```bash
celestia light start --core.ip consensus-full-arabica-9.celestia-arabica.com --p2p.network arabica
```

### 💬 Say gm world {#say-gm-world}

Now, we're going to get our blockchain to say `gm world!` - in order to do so
you need to make the following changes:

* Modify a protocol buffer file
* Create a keeper query function that returns data

Protocol buffer files contain proto RPC calls that define Cosmos SDK queries
and message handlers, and proto messages that define Cosmos SDK types. The RPC
calls are also responsible for exposing an HTTP API.

The `Keeper` is required for each Cosmos SDK module and is an abstraction for
modifying the state of the blockchain. Keeper functions allow us to query or
write to the state.

#### ✋ Create your first query {#create-first-query}

**Open a new terminal instance that is not the
same that you started the chain in.**

In your new terminal, `cd` into the `gm` directory and run this command
to create the `gm` query:

```bash
ignite scaffold query gm --response text
```

Response:

```bash
modify proto/gm/gm/query.proto
modify x/gm/client/cli/query.go
create x/gm/client/cli/query_gm.go
create x/gm/keeper/query_gm.go

🎉 Created a query `gm`.
```

What just happened? `query` accepts the name of the query (`gm`), an optional
list of request parameters (empty in this tutorial), and an optional
comma-separated list of response field with a `--response` flag (`text` in this
tutorial).

Navigate to the `gm/proto/gm/gm/query.proto` file, you’ll see that `Gm` RPC has
been added to the `Query` service:

```proto title="gm/proto/gm/gm/query.proto"
service Query {
  rpc Params(QueryParamsRequest) returns (QueryParamsResponse) {
    option (google.api.http).get = "/gm/gm/params";
  }
	rpc Gm(QueryGmRequest) returns (QueryGmResponse) {
		option (google.api.http).get = "/gm/gm/gm";
	}
}
```

The `Gm` RPC for the `Query` service:

* is responsible for returning a `text` string
* Accepts request parameters (`QueryGmRequest`)
* Returns response of type `QueryGmResponse`
* The `option` defines the endpoint that is used by gRPC to generate an HTTP API

#### 📨 Query request and response types {#query-request-and-response-types}

In the same file, we will find:

* `QueryGmRequest` is empty because it does not require parameters
* `QueryGmResponse` contains `text` that is returned from the chain

```proto title="gm/proto/gm/gm/query.proto"
message QueryGmRequest {
}

message QueryGmResponse {
  string text = 1;
}
```

#### 👋 Gm keeper function {#gm-keeper-function}

The `gm/x/gm/keeper/query_gm.go` file contains the `Gm` keeper function that
handles the query and returns data.

<!-- markdownlint-disable MD013 -->
<!-- markdownlint-disable MD010 -->
```go title="gm/x/gm/keeper/query_gm.go"
func (k Keeper) Gm(goCtx context.Context, req *types.QueryGmRequest) (*types.QueryGmResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	_ = ctx
	return &types.QueryGmResponse{}, nil
}
```
<!-- markdownlint-enable MD010 -->
<!-- markdownlint-enable MD013 -->

The `Gm` function performs the following actions:

* Makes a basic check on the request and throws an error if it’s `nil`
* Stores context in a `ctx` variable that contains information about the
environment of the request
* Returns a response of type `QueryGmResponse`

Currently, the response is empty and you'll need to update the keeper function.

Our `query.proto` file defines that the response accepts `text`. Use your text
editor to modify the keeper function in `gm/x/gm/keeper/query_gm.go` .

<!-- markdownlint-disable MD013 -->
<!-- markdownlint-disable MD010 -->
```go title="gm/x/gm/keeper/query_gm.go"
func (k Keeper) Gm(goCtx context.Context, req *types.QueryGmRequest) (*types.QueryGmResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	_ = ctx
	return &types.QueryGmResponse{Text: "gm world!"}, nil // [!code focus]
}
```
<!-- markdownlint-enable MD010 -->
<!-- markdownlint-enable MD013 -->

#### 🟢 Start your sovereign rollup {#start-your-sovereign-rollup}

We have a handy `init-testnet.sh` found in this repo
[here](https://github.com/rollkit/docs/tree/main/docs/scripts/gm).

We can copy it over to our directory with the following commands:

<!-- markdownlint-disable MD013 -->
```bash
# From inside the `gm` directory
wget https://raw.githubusercontent.com/rollkit/docs/main/docs/scripts/gm/init-testnet.sh
```
<!-- markdownlint-enable MD013 -->

This copies over our `init-testnet.sh` script to initialize our
`gm` rollup.

You can view the contents of the script to see how we
initialize the gm rollup.

##### Clear previous chain history

Before starting the rollup, we need to remove the old project folders:

```bash
rm -r $HOME/go/bin/gmd && rm -rf $HOME/.gm
```

##### Start the new chain {#start-the-new-chain}

Now, you can initialize the script with the following command:

```bash
bash init-testnet.sh
```

With that, we have kickstarted our second `gmd` network!

The `query` command has also scaffolded
`x/gm/client/cli/query_gm.go` that
implements a CLI equivalent of the gm query and mounted this command in
`x/gm/client/cli/query.go`.

In a separate window, run the following command:

```bash
gmd q gm gm
```

We will get the following JSON response:

```bash
text: gm world!
```

![gm.png](/gm/gm.png)

Congratulations 🎉 you've successfully built your first rollup and queried it!

If you're interested in looking at the demo repository
for this tutorial, you can at [https://github.com/rollkit/gm](https://github.com/rollkit/gm).
