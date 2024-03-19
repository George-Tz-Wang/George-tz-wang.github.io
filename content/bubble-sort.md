# 冒泡排序

冒泡排序是一种非常简单基础的算法，它的算法逻辑总结为一句话就是：比较相邻两个项的大小，并根据规则决定是否进行位置互换。

```js
  for (let i = 0; i < sortableList.length - 1; i++) {
    for (let j = 0; j < sortableList.length - 1 - i; j++) {
      if (sortableList[j] > sortableList[j + 1]) {
        swap(j, j + 1, sortableList)
      }
    }
  }
```
其中：
* i 表示当前是第几轮循环
* j 表示当前进行判断的数据下标
* j + 1 表示需要与 j 进行比较的数据下标

其中有两个细节需要注意：
* i 从 0 循环到 length - 2，表示最多会进行 length - 1 轮循环
* j 每次从 0 循环到 length - 2 - i，因为每一轮循环都会将最大的元素放到最后，所以剩下的 i 个数据不需要再进行排序

或许代码改为下面的格式会更容易理解：

```js
  for (let i = 1; i < sortableList.length; i++) {
    for (let j = 0; j < sortableList.length - i; j++) {
      if (sortableList[j] > sortableList[j + 1]) {
        swap(j, j + 1, sortableList)
      }
    }
  }
```

* i 从 1 开始循环，直到 length - 1（因为是 < 号，表示不取到最后一个元素）
* j 从 0 开始循环，直到 length - i
