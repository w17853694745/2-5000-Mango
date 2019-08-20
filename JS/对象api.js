(function () {
    //对象与属性
    let obj = new Object();
    Object.create();//创建一个对象
    obj.hasOwnProperty();//检查对象的自定义属性
    obj.preventExtensions();//阻止对象里的任何自定义属性
    Object.isExtensible();//检测对象是否可拓展
    obj.seal();//防止任何可拓展和删除
    Object.freeze();//保持任何级别的不变性,冻结
    Object.preventsExtensions();//可防止将任何属性或新功能（方法）添加到对象。
    Object.seal();//阻止将任何属性或新功能（方法）添加到对象，但也禁止删除。但是，现有属性仍可以更改。
    Object.freeze();//阻止将任何属性或新功能（方法）添加到对象中，禁止删除，不能更改属性。该对象完全不可变。
    Object.getOwnPropertyDescriptor();//了解对象的每个属性
    obj.writeable;//指示是否可以更改属性值。
    obj.configurable//指示是否可以更改或删除属性值。
    obj.enumerable//指示属性是否可枚举。
    obj.value//表示属性的值
    obj.get//作为属性的getter的函数。
    obj.set//充当属性的setter的函数。
    Object.defineProperty();//它允许您使用属性描述符定义属性属性。
})();
(function () {
    //基础
    let i = 0;
    delete i;//删除
})();