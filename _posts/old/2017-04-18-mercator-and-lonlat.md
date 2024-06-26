---
layout: post
title:  "JS 实现墨卡托坐标到经纬度坐标的转换"
date:   2017-04-18 20:00:30 +0800
categories: []
excerpt: 在调用百度地图 API 时发现，墨卡托到经纬度的转换，利用转换公式得到的结果误差较大。本篇文章利用 JS 实现了高精度的转换。
tags:
  - front-end
  - JavaScript
---

categories: [Design]

墨卡托投影，是正轴等角圆柱投影。由荷兰地图学家墨卡托于 1569 年创立。假想一个与地轴方向一致的圆柱切或割于地球，按等角条件，将经纬网投影到圆柱面上，将圆柱面展为平面后，即得本投影。墨卡托投影在切圆柱投影与割圆柱投影中，最早也是最常用的是切圆柱投影。

百度地图和 Google Maps 使用的投影方法都是墨卡托投影。纬度的变换方法为：

> 墨卡托投影把纬度为 Φ(-90°<Φ<90°) 的点投影到
> y = ln(tan(45° + Φ/2))

这种投影算法使得赤道附近的纬线较密，极地附近的纬线较稀。极点被投影到无穷远，所以这种投影不适合在高纬度地区使用。Google Maps 的选取的范围为`-π<y<π`，这样近似的有`-85°<Φ<85°`。

根据上述公式，将墨卡托转为经纬度时，纬度的误差高达 0.2 几。为了实现高精度的转换，使用多项式展开的方式。

{% highlight javascript %}
// 摩卡托转经纬度
function mercator2lonLat(merX, merY) {
    var band = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0];
	// 多项式系数
    var MC2LL = [[1.410526172116255e-8, 0.00000898305509648872, -1.9939833816331, 200.9824383106796, -187.2403703815547, 91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2], [-7.435856389565537e-9, 0.000008983055097726239, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86], [-3.030883460898826e-8, 0.00000898305509983578, 0.30071316287616, 59.74293618442277, 7.357984074871, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37], [-1.981981304930552e-8, 0.000008983055099779535, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06], [3.09191371068437e-9, 0.000008983055096812155, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4], [2.890871144776878e-9, 0.000008983055095805407, -3.068298e-8, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 826088.5]];
    var params;
    for (var i = 0; i < band.length; i++) {
        if (Math.abs(merY) >= band[i]) {
            params = MC2LL[i];
            break;
        }
    }
    var lng = params[0] + params[1] * Math.abs(merX);
    var lat = Math.abs(merY) / params[9];
    lat = params[2] + params[3] * lat + params[4] * Math.pow(lat, 2) + params[5] * Math.pow(lat, 3) + params[6] * Math.pow(lat, 4) + params[7] * Math.pow(lat, 5) + params[8] * Math.pow(lat, 6);
    lng *= (merX < 0 ? -1 : 1);
    lat *= (merY < 0 ? -1 : 1);
	// 输出 '纬度,经度' 的格式，可调
    return lat.toFixed(6) + ',' + lng.toFixed(6);
}
{% endhighlight %}



