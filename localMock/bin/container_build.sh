#!/bin/bash

# このシェルスクリプトのディレクトリの絶対パスを取得。
bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$bin_dir/..
docker_dir=$parent_dir/docker

cp $parent_dir/package.json $docker_dir/apollo/package.json
cp $parent_dir/package-lock.json $docker_dir/apollo/package-lock.json
cp $parent_dir/tsconfig.json $docker_dir/apollo/tsconfig.json


# cp $parent_dir/package.json $parent_dir/docker/node/package.json
cd $docker_dir && docker-compose build
