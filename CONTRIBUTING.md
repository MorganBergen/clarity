#  contributing guidelines

1.  create an issue within one of the phase plans
2.  create a new branch linked to the issue
3.  code into that new branch locally on your machine
4.  `add`, `commit`, and `push` your local changes to the remote branch
5.  submit a new pull request associated with your new branch to compare with `main`
6.  wait for approval from [@morganbergen](https://github.com/MorganBergen/)

###  helper commands

`git status` -  view the state of the working directory and staging area

`git remote -v` - display the url that git uses to `fetch` and `push` update to a remote repo

`git log` - view commit history `commit checksum`, `author`, `date`, `commit message`

`git log -p` - view commit history `commit checksum`, `author`, `date`, `commit message`, `diff --git <dir/file> <dir/file>`

`git log -oneline` - view commit history `commit checksum` and `commit message`

`git log --graph` - vizualize commit history in cli
