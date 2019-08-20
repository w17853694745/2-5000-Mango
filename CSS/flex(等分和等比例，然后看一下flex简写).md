# flex

#### 两组重要的概念

容器 项目

主轴 侧轴

###### 项目默认情况下永远排列在主轴的正方向上

#### 语法

##### 容器

###### 1.控制主轴是哪一根以及主轴的方向

```javascript
flex-direction：

row（水平）/row-reverse/column（垂直）/column-reverse
```

###### 2.控制侧轴方向

```javascript
flex-wrap:
wrap:正方向
wrap-reverse：
反方向
nowrap：不换行
```



###### 富裕空间管理

```javascript
主轴：justify-content:
flex-start:富裕空间在主轴的正方向
flex-end:富裕空间在主轴的反方向
center：富裕空间在主轴的两边
space-between：富裕空间在项目之间
space-around：富裕空间在项目两边
侧轴：align-items（单行）：
flex-start：富裕空间在侧轴正方向
flex-end：富裕空间在侧轴反方向
center：富裕空间在侧轴的两边
align-content（多行）：会把侧轴的多行内容统一成一块内容
flex-start：在侧轴正方向
flex-end：在侧轴反方向
center：在侧轴两边
space-between：在项目之间
space-around：在项目两边
```



##### 项目

```javascript
弹性空间管理
主轴：
flex-grow：伸展属性，默认为0
flex-shrink：收缩属性，默认为1
flex-basis：代表项目的初始大小，默认为outo，代表长或宽
flex：是flex-grow，flex-shrink，flex-basis的组合简写：
当flex为1时，代表等分布局flex-grow：1，flex-shrink：1，flex-basis：0%；
当修改flex的值时，修改的是flex-grow的值，其他不变

侧轴：
align-self：代表单个项目分配侧轴剩余的富裕空间

```

排序

order：order 属性规定了弹性容器中的可伸缩项目在布局时的顺序。元素按照 order 属性的值的增序进行布局。拥有相同 order 属性值的元素按照它们在源代码中出现的顺序进行布局

order越大越后

##### 规则

当侧轴多行时，align-content的优先级最高，当单行时，align-self优先级比较高

flex-grow：

   可用空间 = (容器大小 - 所有相邻项目flex-basis的总和)

   可扩展空间 = (可用空间/所有相邻项目flex-grow的总和)

   每项伸缩大小 = (伸缩基准值 + (可扩展空间 x flex-grow值))

flex-shrink：

  1.计算收缩因子与基准值乘的总和  

   2.计算收缩因数

​              收缩因数=（项目的收缩因子*项目基准值）/第一步计算总和    

   3.移除空间的计算

​              移除空间= 项目收缩因数 x 负溢出的空间 

等分部局：

flex：1

等比例布局：

根据每个项目的