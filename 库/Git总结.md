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

​         git log --pretty --oneline 

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

#### 查看相关的命令

find 目录名                         将对应目录下的文件&目录平铺在控制台

find 目录名 -type f             将对应目录下的文件平铺在控制台

cat 文件的url                       查看对应文件的内容

git cat-file -p（-t返回类型） 文件hash                                             查看git对象的内容

git status                                                                                              检查当前**工作目录**中文件的状态

git log （显示所有的更新，最新的在最上边）

git log --pretty --oneline 返回当前分支的父节点

**git branch :查看分支列表**

git branch --merged ：查看哪些分支以及合并到当前分支  

git branch --no-merged：查看所有包含未合并工作的分支

命令：git log --oneline --decorate --graph --all

git ls-files -s :查看暂存区

git cat-file -p HEAD：查看当前提交对象

git ls-tree -r HEAD：查看当前提交对象对应的树对象

#git log      从当前提交对象 沿着 父级往上的所有提交对象组成的链
#git reflog   只要动了HEAD 就会记录下来

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

### 2.查看当前分支所指对象

命令：git log --oneline –decorate

### 3.切换分支

命令：git checkout 分支名

命令2： git checkout -b name : 创建又切换

### 4.查看项目分叉历史

命令：git log --oneline --decorate --graph --all

### 5.分支合并

命令：git merge 分支名

### 6.删除分支

git branch -d name ：删除分支

git branch -D name ：强制删除

## 五：撤销&重置

### 撤销

**撤销操作的本质，就是覆盖**

git checkout --文件名：撤销对工作目录文件的修改

git reset HEAD 文件名：撤回暂存区的内容到工作目录

git commit -amend ：撤销提交对象

### HEAD

HEAD 是当前分支引用的指针，它总是指向该分支上的最后一次提交。

这表示 HEAD 将是下一次提交的父结点

git cat-file -p HEAD：查看当前提交对象

git ls-tree -r HEAD :查看当前提交对象对应的树对象

git ls-files -s 查看当前暂存区的内容

### 重置reset

**如果后面跟的是一个提交对象的hash，改变的就是整个版本库，不同的命令就是返回三个等级，提交对象，暂存区和工作区**

**如果提供一个作用路径。 若指定了一个路径，reset 将会跳过第 1 步，并且将它的作用范围限定为指定的文件或文件集合。**





**git reset -soft HEAD~（返回）** ：移动HEAD的指向，类似于撤回git commit -amend（撤回提交对象）

 **用commitHash对应的提交对象 覆盖 当前的HEAD**

![1566296352104](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1566296352104.png)

**git reset 【--mixed】HEAD~**：类似于git reset HEAD 文件名（撤回保存到暂存区的内容）

 **用commitHash对应的提交对象 覆盖 HEAD 暂存区**

git reset --mixed commitHash --filename（指定文件名）
 **用commitHash对应的提交对象 覆盖  暂存区**

![1566296369523](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1566296369523.png)

**git reset --hard HEAD~**：类似于checkout（切换版本）

![1566296381285](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1566296381285.png)

### checkout命令

   git checkout branchName   指定分支名：切换分支
                -->      git reset --hard  commitHash       
                         覆盖 HEAD 暂存区 工作区
   git checkout commitHash -- filename   指定提交对象和文件名，覆盖暂缓区和工作区
                        覆盖  暂存区 工作区
   git checkout -- filename 指定文件名 覆盖工作区
                        覆盖  工作区 



## 六：团队协作

### github + git

1. 远程分支
    github上的分支
    
2. 远程跟踪分支
    只要和远程库建立了联系就会自动生成 远程跟踪分支
        克隆了一个仓库
        往远程仓库提交数据时
    
3. 跟踪分支
    本地分支( 只要一个普通分支 跟 远程跟踪分支 对应起来了就可以称为跟踪分支)
    
    

### 协作流程

#### 1.项目经理建立远程仓库

通过点击面板右侧的“New repository”按钮，或者顶部工具条你用户名旁边的 + 按钮。点击后会出现“new repository” 表单:

#### 2.项目经理为远程仓库配别名

**git remote add <shortname> <url>** 

添加一个新的远程 Git 仓库，同时指定一个你可以轻松引用的简写

**git remote –v**

显示远程仓库使用的 Git 别名与其对应的 URL

**git remote show [remote-name]**

查看某一个远程仓库的更多信息

**git remote rename pb paul**

重命名

**git remote rm [remote-name]**

​	如果因为一些原因想要移除一个远程仓库 - 你已经从服务器上搬走了或不再想使用某一个特定的镜像了，又或者某一个贡献者不再贡献了

#### 3.项目经理初始化远程仓库的代码

**git push [remote-name] [branch-name]**

#### 4.项目经理要去邀请开发人员

然后从左侧菜单中选择 “Collaborators” 。 然后，在输入框中填写用户名，点击 “Add collaborator.”

#### 5.成员接收邀请

#### 6.成员克隆仓库

**git** **clone** **url** **（克隆时不需要 git** **init）**

#### 7.成员提交更新

**git push [remote-name] [branch-name]**

#### 8.项目经理下载更新

**git fetch [remote-name]**

### 注意点

当本地分支没有进化成跟踪分支时 怎么去拿数据
    1. git fetch name  :   数据自动下到了远程跟踪分支上
       本地分支 去 合并 远程跟踪分支   

























每一个树对象，一个版本（一次整体的操作）

一个提交对象，对应一个版