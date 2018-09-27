#!/bin/bash
CONTRACTBUILD_DIR=contracts-build
mkdir -p $CONTRACTBUILD_DIR
solc --optimize --optimize-runs 20000 --bin --abi --pretty-json --metadata --overwrite -o $PWD/$CONTRACTBUILD_DIR/ SimpleMultiSig.sol
mv $CONTRACTBUILD_DIR/SimpleMultiSig.abi{,.json}