# Git

## 一：版本控制系统

**Ctrl c + Ctrl v**

操作本地的文件夹（复制粘贴）

优点：简单，容易操作

缺点：风险很大，容易出错，不能协同合作

**本地版本控制系统**

rcs（类似于本地的数据库，存储的是版本补丁）

优点：容易操作，数据相对安全

缺点：不能协同合作

**集中式版本控制系统**

svn

优点：可以协同合作

缺点：服务器的单点故障可能会造成数据的丢失（每个客户端拿到的都是最新版本的关于自己模块）

会造成工作效率的低下（版本切换效率不高，切版本太慢，需要从最新版本一级一级的往后切换）

造成团队任务的负担（备份不完善，如果无法提交只能自己保存）

分布式版本控制系统

git（本地 ）+ githup/gitlab（协同）

优点：版本控制高效，切换速度快

每个客户端都保存了完整的项目文件（包含历史纪录）

配合githup gitlab 可以进行协同开发

缺点：学习路线陡峭

## 二：Git简介

**对象：**

git对象(blob类型)
    存储key-val的键值对  /* key文件对应的hash val文件的内容 */
    问题: 没有存文件名
    作用: 存储文件的内容  是文件维度的概念
树对象(tree类型)
    作用: 存储的是用户的操作 是操作维度的概念
提交对象(commit)
    作用: 为树对象做注释 包含很多额外的信息
    
最终结论
    一个提交对象就是一个完整的项目版本!!!(包含历史记录的)    
最终问题:
       git对象
       树对象
       提交对象  都是hash   我们还是要记hash

**区域**

工作区

暂存区

版本库

### 1：命令

#### linux命令

clear                                    清除屏幕
echo 'test content'            往控制台输出信息
ll                                           将当前目录下的文件&目录平铺在控制台
find 目录名                         将对应目录下的文件&目录平铺在控制台
find 目录名 -type f             将对应目录下的文件平铺在控制台

cat 文件的url                       查看对应文件的内容

vim 文件的url （在英文输入模式）

​      按 i 进入插入模式，进行文件的编辑

​      按esc 键 + ：键进行命令的执行

​           q  普通退出（不做修改）

​           ！q 强制退出

​           w q 保存退出

​           set nu 设置显示行号

mv  源文件  重命名  ：文件重命名

#### git底层命令

**git对象**

echo 'test content' | git hash-object -w --stdin                             将控制台的输出信息纳入git的管理
git hash-object  文件路径                                                                  返回对应文件的key(hash  不存内容)
git hash-object -w 文件路径                                                              将文件内容纳入git的管理
git cat-file -p（-t返回类型） 文件hash                                             查看git对象的内容

**树对象**

git update-index --add --cacheinfo 文件hash test.txt                   往暂存区塞入数据

git update-index --add 文件名                                                          生成git对象  塞入暂存区（新建文件）

git read-tree  --prefix=bak 文件hash                                               读一颗树进入暂存区

git write-tree                                                                                       生成树对象（把暂存区内容的形成快照）、

**git commit-tree** **不但生成提交对象 而且会将对应的快照提交到本地库中**

**提交对象**

echo 'second commit' | git commit-tree 0155eb                         创建提交对象

 echo 'second commit' | git commit-tree 0155eb -p fdf4fc3      创建提交对象，并指定父提交对象

#### git高层命令（需要记忆的部分）

git init :                                                                                                 初始化仓库

git status                                                                                              检查当前**工作目录**中文件的状态

git add 文件/目录                                                                                生成对应的git对象，并放到暂存区（跟踪文件）

git commit                                                                                            把暂存区的内容生成树对象并生成提交对象

​             git commit -m  message ：创建树对象，创建提交对象
​             git commit -a (使用-a的时候 文件一定得是以跟踪的) ：直接提交，跳过git.add  暂存区
​             git commit -a -m message

git CRUD

##### CU（新增，修改）：

git add --> git commit （新增）

git mv oldname newname --> git commit（修改文件名）

##### D(删除)：

git rm delFilename  --> git commit （删除）

##### R（查找）：

日志

git log （显示所有的更新，最新的在最上边）

​         git log --pretty=oneline 

分支：切换分支时，一定要确定分支是干净的

**git branch :查看分支列表**

​         git branch --merged ：查看哪些分支以及合并到当前分支  

​         git branch --no-merged：查看所有包含未合并工作的分支

**git branch name ：创建分支**

​         git branch name 文件hash ：版本穿梭

**git checkout name ：切换分支**

​         git checkout -b name ：创建且切换

**git branch -d name ：删除分支**

​        git branch -D name ：强制删除

git branch -v ：查看每一个分支的最后一次提交



## 三：本地操作（高级命令）

### 1.初始化新仓库

命令： git init

初始化后，在当前目录下会出现一个名为 .git 的目录，所有 Git 需要的数据和资源都存放在这个目录中

### 2.记录每次更新到仓库

工作目录下面的所有文件都不外乎这两种状态：**已跟踪或未跟踪**

已跟踪时它们的状态可能是已提交（未提交）放到版本库，已修改（未修改）修改版本库的内容，或者已暂存（未暂存）放到暂存区，所有其他文件都属于未跟踪文件。

### 3.检查当前文件状态

命令：git status

确定工作目录文件当前处于什么状态 

### 4.基本操作

#### 4.1：追踪新文件

命令：git add 文件名（创建一个git对象，放到暂存区）

跟踪一个新文件,如果是目录的话，就说明要递归跟踪该目录下的所有文件

#### 4.2:暂存已修改文件

Git 会暂存你运行 git add 命令时的版本，如果新提交，那么提交的是添加注释前的版本，而非当前工作目录中的版本。所以，运行了 git add 之后又作了修订的文件，需要重新运行 git add把最新版本重新暂存起来

#### 4.3：提交更新

命令：git commit //提交更新

命令2：git commit –m “message xxx” //提交更新，并输入message

命令3：git commit -a（必须是已跟踪文件）//跳过add，直接提交更新

#### 4.4：移除文件

命令：git rm 文件名

需要调用 git commit 来提交日志，这样git才会记录这次操作

#### 4.5：文件改名

命令：git mv oldname newname

运行这个命令相当于运行以下三个命令

$ mv README.txt README

$ git rm README.txt

$ git add README

#### 4.6：查看历史纪录

命令：git log

默认不用任何参数的话，git log 会按提交时间列出所有的更新，最近的更新排在最上面，正如你所看到的，这个命令会列出每个提交的 SHA-1 校验和、作者的名字和电子邮件地址、提交时间以及提交说明

参数：git log --pretty=oneline

​           git log –oneline

#### 4.7：分支

**分支本质**

Git 的分支，**其实本质上仅仅是指向提交对象的可变指针**。 Git 的默认分支名字是 master

**分支原理**

HEAD 文件是一个符号引用（symbolic reference），指向目前所在的分支。 所谓符号引用，意味着它并不像普通引用那样包含一个 SHA-1 值。它是一个指向其他引用的指针

## 四：Git分支操作

### 1.创建分支

命令：git branch 分支名

为你创建了一个可以移动的新的指针。git branch  分支名 创建 一个新分支，并不会自动切换到新分支中去

#### 1.1命令总结

git branch 不只是可以创建与删除分支。 如果不加任何参数运行它，会得到当前所有分支的一个列表

git branch -d name  删除分支

git branch –v  可以查看每一个分支的最后一次提交

git branch name commitHash（版本穿梭）  新建一个分支并且使分支指向对应的提交对象

git branch –merged  查看哪些分支已经合并到当前分支，在这个列表中分支名字前没有 * 号的分支是可以删除

git branch --no-merged  查看所有包含未合并工作的分支，尝试使用 git branch -d 命令删除在这个列表中的分支时会失败。如果真的想要删除分支并丢掉那些工作，可以使用 -D 选项强制删除它。

### 2.删除分支

命令：git branch -d name

git branch -D name ：强制删除

### 2.查看当前分支所指对象

命令：git log --oneline –decorate

### 3.切换分支

命令：git checkout 分支名

命令2： git checkout -b name : 创建又切换

### 4.查看项目分叉历史

命令：git log --oneline --decorate --graph --all

### 5.分支合并

命令：git merge 分支名

冲突：

你可以在合并冲突后的任意时刻使用 **git status** 命令来查看那些因包含合并冲突而处于未合并（unmerged）状态的文件

在你解决了所有文件里的冲突之后，对每个文件使用 **git add** 命令来将其标记为冲突已解决。 一旦暂存这些原本有冲突的文件，Git 就会将它们标记为冲突已解决







































每一个树对象，一个版本（一次整体的操作）

一个提交对象，对应一个版本