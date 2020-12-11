/*
This application was built based on Jeremy Howard's Bear Classifier Webapp. It uses the Fast AI Library, Intel's Haarcascades and Croppie JS plugin



Copyright (c) 2015 Foliotek Inc
-------------------------------
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


By downloading, copying, installing or using the software you agree to this license.
If you do not agree to this license, do not download, install,
copy or use the software.


                          License Agreement
               For Open Source Computer Vision Library
                       (3-clause BSD License)

Copyright (C) 2000-2019, Intel Corporation, all rights reserved.
Copyright (C) 2009-2011, Willow Garage Inc., all rights reserved.
Copyright (C) 2009-2016, NVIDIA Corporation, all rights reserved.
Copyright (C) 2010-2013, Advanced Micro Devices, Inc., all rights reserved.
Copyright (C) 2015-2016, OpenCV Foundation, all rights reserved.
Copyright (C) 2015-2016, Itseez Inc., all rights reserved.
Third party copyrights are property of their respective owners.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice,
    this list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

  * Neither the names of the copyright holders nor the names of the contributors
    may be used to endorse or promote products derived from this software
    without specific prior written permission.

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are disclaimed.
In no event shall copyright holders or contributors be liable for any direct,
indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused
and on any theory of liability, whether in contract, strict liability,
or tort (including negligence or otherwise) arising in any way out of
the use of this software, even if advised of the possibility of such damage.


Apache License, Version 2.0 Apache License Version 2.0, January 2004 http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.

"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.

"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.

"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).

"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.

"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."

"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.

2. Grant of Copyright License.

Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

3. Grant of Patent License.

Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.

4. Redistribution.

You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:

You must give any other recipients of the Work or Derivative Works a copy of this License; and You must cause any modified files to carry prominent notices stating that You changed the files; and You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License. You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.

5. Submission of Contributions.

Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.

6. Trademarks.

This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty.

Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.

8. Limitation of Liability.

In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability.

While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.


*/
(function($) {
    $(document).ready(function() {
        $('#cssmenu').prepend('<div id="menu-button">Menu</div>');
        $('#cssmenu #menu-button').on('click', function() {
            var menu = $(this).next('ul');
            if (menu.hasClass('open')) {
                menu.removeClass('open');
            } else {
                menu.addClass('open');
            }
        });
    });
})(jQuery);




document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove("lazy");
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
})




var CropImage = (function() {

    function output(node) {
        var existing = $('#result .croppie-result');
        if (existing.length > 0) {
            existing[0].parentNode.replaceChild(node, existing[0]);
        } else {
            $('#result')[0].appendChild(node);
        }
    }

    function popupResult(result) {
        window.html;
        window.newbase64;



        if (result.html) {
            html = result.html;
        }
        if (result.src) {
            html = '<img      src="' + result.src + '" />';

            newbase64 = result.src;

            // newbase64 = "'" +  result.src +  "'" ;



        }
        swal({
            title: '<u>ATTENTION</u> <br>UPPER BODY ONLY',
            html: true,
            text: html,

            allowOutsideClick: true
        });
        setTimeout(function() {
            $('.sweet-alert').css('margin', function() {
                // var top = -1 * ($(this).height() / 2),
                // 	left = -1 * ($(this).width() / 2);
                //
                // return top + 'px 0 0 ' + left + 'px';
            });
        }, 1);
    }

    function demoMain() {
        var mc = $('#cropper-1');
        mc.croppie({
            viewport: {
                width: 150,
                height: 150,
                type: 'square'
            },
            boundary: {
                width: 300,
                height: 300
            },
            // url: 'demo/demo-1.jpg',
            enforceBoundary: false
                // mouseWheelZoom: false
        });
        mc.on('update', function(ev, data) {
            // console.log('jquery update', ev, data);
        });
        $('.js-main-image').on('click', function(ev) {
            mc.croppie('result', {
                type: 'rawcanvas',
                // size: { width: 300, height: 300 },
                format: 'png'
            }).then(function(canvas) {
                popupResult({
                    src: canvas.toDataURL()
                });
            });
        });
    }

    function demoBasic() {
        var $w = $('.basic-width'),
            $h = $('.basic-height'),
            basic = $('#demo-basic').croppie({
                viewport: {
                    width: 150,
                    height: 200
                },
                boundary: {
                    width: 300,
                    height: 300
                }
            });
        basic.croppie('bind', {
            url: 'demo/cat.jpg',
            points: [77, 469, 280, 739]
        });

        $('.basic-result').on('click', function() {
            var w = parseInt($w.val(), 10),
                h = parseInt($h.val(), 10),
                s
            size = 'viewport';
            if (w || h) {
                size = {
                    width: w,
                    height: h
                };
            }
            basic.croppie('result', {
                type: 'canvas',
                size: size
            }).then(function(resp) {
                popupResult({
                    src: resp
                        //  $('#form').submit();
                });
            });
        });
    }

    function demoVanilla() {
        var vEl = document.getElementById('vanilla-demo'),
            vanilla = new Croppie(vEl, {
                viewport: {
                    width: 100,
                    height: 100
                },
                boundary: {
                    width: 300,
                    height: 300
                },
                showZoomer: false,
                enableOrientation: true
            });
        vanilla.bind({
            url: 'demo/demo-2.jpg',
            orientation: 4,
            zoom: 0
        });
        vEl.addEventListener('update', function(ev) {
            console.log('vanilla update', ev);
        });
        document.querySelector('.vanilla-result').addEventListener('click', function(ev) {
            vanilla.result({
                type: 'blob'
            }).then(function(blob) {
                popupResult({
                    src: window.URL.createObjectURL(blob)
                });
            });
        });

        $('.vanilla-rotate').on('click', function(ev) {
            vanilla.rotate(parseInt($(this).data('deg')));
        });
    }

    function demoResizer() {
        var vEl = document.getElementById('resizer-demo'),
            resize = new Croppie(vEl, {
                viewport: {
                    width: 100,
                    height: 100
                },
                boundary: {
                    width: 300,
                    height: 300
                },
                showZoomer: false,
                enableResize: true,
                enableOrientation: true
            });
        resize.bind({
            url: 'demo/demo-2.jpg',
            zoom: 0
        });
        vEl.addEventListener('update', function(ev) {
            console.log('resize update', ev);
        });
        document.querySelector('.resizer-result').addEventListener('click', function(ev) {
            resize.result({
                type: 'blob'
            }).then(function(blob) {
                popupResult({
                    src: window.URL.createObjectURL(blob)
                });
            });
        });
    }

    function demoUpload() {
        var $uploadCrop;

        function readFile(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('.upload-demo').addClass('ready');
                    $uploadCrop.croppie('bind', {
                        url: e.target.result
                    }).then(function() {
                        console.log('jQuery bind complete');
                    });

                }

                reader.readAsDataURL(input.files[0]);
            } else {
                swal("Sorry - you're browser doesn't support the FileReader API");
            }
        }

        $uploadCrop = $('#upload-demo').croppie({
            viewport: {
                width: 180,
                height: 245,

            },
            enableExif: true
        });

        $('#upload').on('change', function() {
            readFile(this);
        });
        $('.upload-result').on('click', function(ev) {
            $uploadCrop.croppie('result', {
                type: 'canvas',
                size: 'viewport'
            }).then(function(resp) {
                popupResult({
                    src: resp




                });
            });
        });
    }

    function demoHidden() {
        var $hid = $('#hidden-demo');

        $hid.croppie({
            viewport: {
                width: 175,
                height: 175,
                type: 'circle'
            },
            boundary: {
                width: 200,
                height: 200
            }
        });
        $hid.croppie('bind', 'demo/demo-3.jpg');
        $('.show-hidden').on('click', function() {
            $hid.toggle();
            $hid.croppie('bind');
        });
    }

    function bindNavigation() {
        var $body = $('body');
        $('nav a').on('click', function(ev) {
            var lnk = $(ev.currentTarget),
                href = lnk.attr('href'),
                targetTop = $('a[name=' + href.substring(1) + ']').offset().top;

            $body.animate({
                scrollTop: targetTop
            });
            ev.preventDefault();
        });
    }

    function init() {
        bindNavigation();
        //demoMain();
        //demoBasic();
        //demoVanilla();
        //demoResizer();
        demoUpload();
        //demoHidden();
    }

    return {
        init: init
    };
})();


// Full version of `log` that:
//  * Prevents errors on console methods when no console present.
//  * Exposes a global 'log' function that preserves line numbering and formatting.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }


    if (Function.prototype.bind) {
        window.log = Function.prototype.bind.call(console.log, console);
    } else {
        window.log = function() {
            Function.prototype.apply.call(console.log, console, arguments);
        };
    }
})();



function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
        type: mimeString
    });
}




var CropImage = (function() {

    function output(node) {
        var existing = $('#result .croppie-result');
        if (existing.length > 0) {
            existing[0].parentNode.replaceChild(node, existing[0]);
        } else {
            $('#result')[0].appendChild(node);
        }
    }

    function popupResult(result) {
        window.html;
        window.newbase64;



        if (result.html) {
            html = result.html;
        }
        if (result.src) {
            html = '<img      src="' + result.src + '" />';

            newbase64 = result.src;



            // $("#image-final").html(html);


        }
        swal({
            title: 'REMINDER: <br>MUST BE FLEXED UPPER BODY ONLY!',

            html: true,
            text: html,

            allowOutsideClick: true
        });
        setTimeout(function() {
            $('.sweet-alert').css('margin', function() {
                // var top = -1 * ($(this).height() / 2),
                // 	left = -1 * ($(this).width() / 2);
                //
                // return top + 'px 0 0 ' + left + 'px';
            });
        }, 1);
    }

    function demoMain() {
        var mc = $('#cropper-1');
        mc.croppie({
            viewport: {
                width: 150,
                height: 150,
                type: 'square'
            },
            boundary: {
                width: 300,
                height: 300
            },
            // url: 'demo/demo-1.jpg',
            enforceBoundary: false
                // mouseWheelZoom: false
        });
        mc.on('update', function(ev, data) {
            // console.log('jquery update', ev, data);
        });
        $('.js-main-image').on('click', function(ev) {
            mc.croppie('result', {
                type: 'rawcanvas',
                // size: { width: 300, height: 300 },
                format: 'png'
            }).then(function(canvas) {
                popupResult({
                    src: canvas.toDataURL()
                });
            });
        });
    }

    function demoBasic() {
        var $w = $('.basic-width'),
            $h = $('.basic-height'),
            basic = $('#demo-basic').croppie({
                viewport: {
                    width: 150,
                    height: 200
                },
                boundary: {
                    width: 300,
                    height: 300
                }
            });
        basic.croppie('bind', {
            url: 'demo/cat.jpg',
            points: [77, 469, 280, 739]
        });

        $('.basic-result').on('click', function() {
            var w = parseInt($w.val(), 10),
                h = parseInt($h.val(), 10),
                s
            size = 'viewport';
            if (w || h) {
                size = {
                    width: w,
                    height: h
                };
            }
            basic.croppie('result', {
                type: 'canvas',
                size: size
            }).then(function(resp) {
                popupResult({
                    src: resp
                        //  $('#form').submit();
                });
            });
        });
    }

    function demoVanilla() {
        var vEl = document.getElementById('vanilla-demo'),
            vanilla = new Croppie(vEl, {
                viewport: {
                    width: 100,
                    height: 100
                },
                boundary: {
                    width: 300,
                    height: 300
                },
                showZoomer: false,
                enableOrientation: true
            });
        vanilla.bind({
            url: 'demo/demo-2.jpg',
            orientation: 4,
            zoom: 0
        });
        vEl.addEventListener('update', function(ev) {
            console.log('vanilla update', ev);
        });
        document.querySelector('.vanilla-result').addEventListener('click', function(ev) {
            vanilla.result({
                type: 'blob'
            }).then(function(blob) {
                popupResult({
                    src: window.URL.createObjectURL(blob)
                });
            });
        });

        $('.vanilla-rotate').on('click', function(ev) {
            vanilla.rotate(parseInt($(this).data('deg')));
        });
    }

    function demoResizer() {
        var vEl = document.getElementById('resizer-demo'),
            resize = new Croppie(vEl, {
                viewport: {
                    width: 100,
                    height: 100
                },
                boundary: {
                    width: 300,
                    height: 300
                },
                showZoomer: false,
                enableResize: true,
                enableOrientation: true
            });
        resize.bind({
            url: 'demo/demo-2.jpg',
            zoom: 0
        });
        vEl.addEventListener('update', function(ev) {
            console.log('resize update', ev);
        });
        document.querySelector('.resizer-result').addEventListener('click', function(ev) {
            resize.result({
                type: 'blob'
            }).then(function(blob) {
                popupResult({
                    src: window.URL.createObjectURL(blob)
                });
            });
        });
    }

    function demoUpload() {
        var $uploadCrop;

        function readFile(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    $('.upload-demo').addClass('ready');
                    $uploadCrop.croppie('bind', {
                        url: e.target.result
                    }).then(function() {
                        console.log('jQuery bind complete');
                    });

                }

                reader.readAsDataURL(input.files[0]);
            } else {
                swal("Sorry - you're browser doesn't support the FileReader API");
            }
        }

        $uploadCrop = $('#upload-demo').croppie({
            viewport: {
                width: 180,
                height: 245,

            },
            enableExif: true
        });

        $('#upload').on('change', function() {
            readFile(this);
        });
        $('.upload-result').on('click', function(ev) {
            $uploadCrop.croppie('result', {
                type: 'canvas',
                size: 'viewport'
            }).then(function(resp) {
                popupResult({
                    src: resp




                });
            });
        });
    }

    function demoHidden() {
        var $hid = $('#hidden-demo');

        $hid.croppie({
            viewport: {
                width: 175,
                height: 175,
                type: 'circle'
            },
            boundary: {
                width: 200,
                height: 200
            }
        });
        $hid.croppie('bind', 'demo/demo-3.jpg');
        $('.show-hidden').on('click', function() {
            $hid.toggle();
            $hid.croppie('bind');
        });
    }

    function bindNavigation() {
        var $body = $('body');
        $('nav a').on('click', function(ev) {
            var lnk = $(ev.currentTarget),
                href = lnk.attr('href'),
                targetTop = $('a[name=' + href.substring(1) + ']').offset().top;

            $body.animate({
                scrollTop: targetTop
            });
            ev.preventDefault();
        });
    }

    function init() {
        bindNavigation();
        //demoMain();
        //demoBasic();
        //demoVanilla();
        //demoResizer();
        demoUpload();
        //demoHidden();
    }

    return {
        init: init
    };
})();


// Full version of `log` that:
//  * Prevents errors on console methods when no console present.
//  * Exposes a global 'log' function that preserves line numbering and formatting.
(function() {
    var method;
    var noop = function() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }


    if (Function.prototype.bind) {
        window.log = Function.prototype.bind.call(console.log, console);
    } else {
        window.log = function() {
            Function.prototype.apply.call(console.log, console, arguments);
        };
    }
})();




function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
        type: mimeString
    });
}


var el = x => document.getElementById(x);

function showPicker() {
    el("file-input").click();
}

function analyze(paymentData) {

    // var uploadFiles = dataURItoBlob(newbase64);

    var uploadFiles = el("upload").files;


    el("analyze-button").innerHTML = "ESTIMATING...";
    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
        true);
    xhr.onerror = function() {
        alert(xhr.responseText);
    };
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            try {
                var response = JSON.parse(e.target.responseText);
                if (!response['payment_failed']) {
                    el("result-text").innerHTML = `Your body fat percentage (range) is: <br><br>`;
                    el("result-label").innerHTML = `${response['result']} %`;
                } else {
                    show_failed_payment_notification();
                }
            } catch (e) {
                show_failed_payment_notification();
            }

        }
        el("analyze-button").innerHTML = "UPLOAD IMAGE";
    };

    var fileData = new FormData();
    fileData.append("file", uploadFiles[0]);
    fileData.append("payment_id", paymentData.paymentId)
    xhr.send(fileData);
}

function showDiv() {
    // document.getElementById('welcomeDiv').style.display = "block";

    //  $('#welcomeDiv').toggle(10000, function() {
    //   // Animation complete.
    // });
}





function usnavy(paymentData) {

    var gender;
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if (document.getElementById('female').checked) {
        gender = document.getElementById('female').value;
    }

    var age = document.getElementById('age').value;
    var weight = document.getElementById('weight').value;
    var height_feet = document.getElementById('height_feet').value;
    var height_inches = document.getElementById('height_inches').value;
    var neck_feet = document.getElementById('neck_feet').value;
    var neck_inches = document.getElementById('neck_inches').value;
    var waist_feet = document.getElementById('waist_feet').value;
    var waist_inches = document.getElementById('waist_inches').value;
    var hip_feet = document.getElementById('hip_feet').value;
    var hip_inches = document.getElementById('hip_inches').value;

    if (hip_feet === "") {
        hip_feet = 0;
    }

    if (hip_inches === "") {
        hip_inches = 0;
    }


    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/usunitnavy`,
        true);
    xhr.onerror = function() {
        alert(xhr.responseText);
    };
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            try {
                var response = JSON.parse(e.target.responseText);
                if (!response['payment_failed']) {
                    el("usnavy-label").innerHTML = `${response['answer']} %`;
                    el("fatmass").innerHTML = `${response['fatmass']} Pounds`;
                    el("leanmass").innerHTML = `${response['leanmass']} Pounds`;
                    el("bmi").innerHTML = `${response['bmi']}`;
                    el("bmi-category").innerHTML = `${response['bmi-category']}`;
                    // on coronovirus page these elements don't exist what causes exception
                    if (el("army-note")) {
                        el("army-note").innerHTML = `${response['army-note']}`;
                        el("army-standard-answer").innerHTML = `${response['army-standard-answer']}%`;
                        el("army-post-answer").innerHTML = `${response['army-post-answer']}%`;
                        el("marine-note").innerHTML = `${response['marine-note']}`;
                        el("marine-standard-answer").innerHTML = `${response['marine-standard-answer']}%`;
                        el("navy-note").innerHTML = `${response['navy-note']}`;
                        el("navy-standard-answer").innerHTML = `${response['navy-standard-answer']}%`;
                    }
                } else {
                    show_failed_payment_notification();
                }
            } catch (e) {
                show_failed_payment_notification();
            }

        }
    };

    var fileData = new FormData();
    fileData.append('gender', gender);
    fileData.append('age', age);
    fileData.append('weight', weight);
    fileData.append('height_feet', height_feet);
    fileData.append('height_inches', height_inches);
    fileData.append('neck_feet', neck_feet);
    fileData.append('neck_inches', neck_inches);
    fileData.append('waist_feet', waist_feet);
    fileData.append('waist_inches', waist_inches);
    fileData.append('hip_feet', hip_feet);
    fileData.append('hip_inches', hip_inches);
    fileData.append("payment_id", paymentData.paymentId)
    xhr.send(fileData);

}




function hideA(x) {
    if (x.checked) {
        document.getElementById("navy-form").style.display = "none";
        document.getElementById("metric-navy-form").style.display = "block";
    }

}

function hideB(x) {
    if (x.checked) {
        document.getElementById("metric-navy-form").style.display = "none";
        document.getElementById("navy-form").style.display = "block";
    }
}


function hideC(x) {
    if (x.checked) {
        document.getElementById("jp3-form").style.display = "block";
        document.getElementById("jp4-form").style.display = "none";
        document.getElementById("jp7-form").style.display = "none";
        document.getElementById("p9-form").style.display = "none";
        document.getElementById("dw4-form").style.display = "none";

    }
}

function hideD(x) {
    if (x.checked) {
        document.getElementById("jp3-form").style.display = "none";
        document.getElementById("jp4-form").style.display = "block";
        document.getElementById("jp7-form").style.display = "none";
        document.getElementById("p9-form").style.display = "none";
        document.getElementById("dw4-form").style.display = "none";

    }
}

function hideE(x) {
    if (x.checked) {
        document.getElementById("jp3-form").style.display = "none";
        document.getElementById("jp4-form").style.display = "none";
        document.getElementById("jp7-form").style.display = "none";
        document.getElementById("p9-form").style.display = "none";
        document.getElementById("dw4-form").style.display = "block";

    }
}

function hideF(x) {
    if (x.checked) {
        document.getElementById("jp3-form").style.display = "none";
        document.getElementById("jp4-form").style.display = "none";
        document.getElementById("jp7-form").style.display = "block";
        document.getElementById("p9-form").style.display = "none";
        document.getElementById("dw4-form").style.display = "none";

    }
}

function hideG(x) {
    if (x.checked) {
        document.getElementById("jp3-form").style.display = "none";
        document.getElementById("jp4-form").style.display = "none";
        document.getElementById("jp7-form").style.display = "none";
        document.getElementById("p9-form").style.display = "block";
        document.getElementById("dw4-form").style.display = "none";

    }
}




$(function() {
    $('input[name="gender"]').on('click', function() {
        if ($(this).val() == '2') {
            $('#textboxes').show();
        } else {
            $('#textboxes').hide();
        }
    });
});


$(function() {
    $('input[name="gender"]').on('click', function() {
        if ($(this).val() == '4') {
            $('#metrictextboxes').show();
        } else {
            $('#metrictextboxes').hide();
        }
    });
});


$(function() {
    $('input[name="gender3f"]').on('click', function() {
        if ($(this).val() == '16') {
            $('#women3f').show();
        } else {
            $('#women3f').hide();
        }
    });
});


$(function() {
    $('input[name="gender3f"]').on('click', function() {
        if ($(this).val() == '15') {
            $('#men3f').show();
        } else {
            $('#men3f').hide();
        }
    });
});




function metricusnavy(paymentData) {

    var gender;
    if (document.getElementById('m').checked) {
        gender = document.getElementById('m').value;
    } else if (document.getElementById('f').checked) {
        gender = document.getElementById('f').value;
    }

    var age = document.getElementById('age123').value;
    var weight = document.getElementById('weight123').value;


    var height = document.getElementById('height').value;
    var neck = document.getElementById('neck').value;
    var waist = document.getElementById('waist').value;
    var hip = document.getElementById('hip').value;


    if (hip === "") {
        hip = 0;
    }



    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/metricunitnavy`,
        true);
    xhr.onerror = function() {
        alert(xhr.responseText);
    };
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            try {
                var response = JSON.parse(e.target.responseText);

                if (!response['payment_failed']) {
                    el("usnavy-label").innerHTML = `${response['answer']} %`;
                    el("fatmass").innerHTML = `${response['fatmass']} Kgs`;
                    el("leanmass").innerHTML = `${response['leanmass']} Kgs`;
                    el("bmi").innerHTML = `${response['bmi']}`;
                    el("bmi-category").innerHTML = `${response['bmi-category']}`;

                    // on coronovirus page these elements don't exist what causes exception
                    if (el("army-note")) {
                        el("army-note").innerHTML = `${response['army-note']}`;
                        el("army-standard-answer").innerHTML = `${response['army-standard-answer']}%`;
                        el("army-post-answer").innerHTML = `${response['army-post-answer']}%`;
                        el("marine-note").innerHTML = `${response['marine-note']}`;
                        el("marine-standard-answer").innerHTML = `${response['marine-standard-answer']}%`;
                        el("navy-note").innerHTML = `${response['navy-note']}`;
                        el("navy-standard-answer").innerHTML = `${response['navy-standard-answer']}%`;
                    }
                } else {
                    show_failed_payment_notification();
                }
            } catch (e) {
                show_failed_payment_notification();
            }
        }
    };

    var fileData = new FormData();
    fileData.append('gender', gender);
    fileData.append('age', age);
    fileData.append('weight', weight);
    fileData.append('height', height);
    fileData.append('neck', neck);
    fileData.append('waist', waist);
    fileData.append('hip', hip);
    fileData.append("payment_id", paymentData.paymentId)
    xhr.send(fileData);

}




function jp3(paymentData) {

    var gender;
    if (document.getElementById('male123').checked) {
        gender = document.getElementById('male123').value;
    } else if (document.getElementById('female123').checked) {
        gender = document.getElementById('female123').value;
    }

    var age = document.getElementById('age345').value;

    var weight_choice;
    if (document.getElementById('kgs123').checked) {
        weight_choice = document.getElementById('kgs123').value;
    } else if (document.getElementById('pounds123').checked) {
        weight_choice = document.getElementById('pounds123').value;
    }

    var weight = document.getElementById('weight345').value;

    var height_choice;
    if (document.getElementById('feet_inchesjp3').checked) {
        height_choice = document.getElementById('feet_inchesjp3').value;
    } else if (document.getElementById('cmjp3').checked) {
        height_choice = document.getElementById('cmjp3').value;
    }

    var height = document.getElementById('height').value;
    var pectoral = document.getElementById('pectoral').value;
    var abdomen_men = document.getElementById('abdomen_men').value;
    var quadricep_men = document.getElementById('quadricep_men').value;
    var women_tricep = document.getElementById('women_tricep').value;
    var quadricep_women = document.getElementById('quadricep_women').value;
    var suprailiac = document.getElementById('suprailiac').value;


    if (pectoral === "") {
        pectoral = 0;
    }
    if (abdomen_men === "") {
        abdomen_men = 0;
    }
    if (quadricep_men === "") {
        quadricep_men = 0;
    }
    if (women_tricep === "") {
        women_tricep = 0;
    }
    if (quadricep_women === "") {
        quadricep_women = 0;
    }
    if (suprailiac === "") {
        suprailiac = 0;
    }



    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/jp3python`,
        true);
    xhr.onerror = function() {
        alert(xhr.responseText);
    };
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            try {
                var response = JSON.parse(e.target.responseText);

                if (!response['payment_failed']) {
                    el("total-bodyfatpercent").innerHTML = `${response['answer']} %`;
                    el("total-fatmass").innerHTML = `${response['fatmass']}`;
                    el("total-leanmass").innerHTML = `${response['leanmass']}`;

                    el("total-bmi").innerHTML = `${response['bmi']}`;
                    el("bmi-category").innerHTML = `${response['bmi-category']}`;

                    el("weight-unit-1").innerHTML = `${response['weightunit']}`;

                    el("weight-unit-2").innerHTML = `${response['weightunit']}`;
                } else {
                    show_failed_payment_notification();
                }
            } catch (e) {
                show_failed_payment_notification();
            }

        }
    };

    var fileData = new FormData();
    fileData.append('gender', gender);
    fileData.append('age', age);
    fileData.append('weight_choice', weight_choice);
    fileData.append('weight', weight);
    fileData.append('height_choice', height_choice);
    fileData.append('height', height);
    fileData.append('pectoral', pectoral);
    fileData.append('abdomen_men', abdomen_men);
    fileData.append('quadricep_men', quadricep_men);
    fileData.append('women_tricep', women_tricep);
    fileData.append('quadricep_women', quadricep_women);
    fileData.append('suprailiac', suprailiac);
    fileData.append("payment_id", paymentData.paymentId)
    xhr.send(fileData);

}

function jp4(paymentData) {


    var gender;
    if (document.getElementById('male12222').checked) {
        gender = document.getElementById('male12222').value;
    } else if (document.getElementById('female1233333').checked) {
        gender = document.getElementById('female1233333').value;
    }

    var age = document.getElementById('age_478478').value;

    var weight_choice;
    if (document.getElementById('kgs_17817123').checked) {
        weight_choice = document.getElementById('kgs_17817123').value;
    } else if (document.getElementById('pounds_1891123').checked) {
        weight_choice = document.getElementById('pounds_1891123').value;
    }

    var weight = document.getElementById('weight_289282345').value;


    var height_choice;
    if (document.getElementById('feet_inches_2902jp3').checked) {
        height_choice = document.getElementById('feet_inches_2902jp3').value;
    } else if (document.getElementById('cmjp_29023').checked) {
        height_choice = document.getElementById('cmjp_29023').value;
    }

    var height = document.getElementById('height12345').value;


    var abdomen = document.getElementById('abdomen_123').value;
    var tricep = document.getElementById('tricep_123').value;
    var quadricep = document.getElementById('quadricep_123').value;
    var suprailiac = document.getElementById('suprailiac_123').value;



    if (abdomen === "") {
        abdomen = 0;
    }
    if (tricep === "") {
        tricep = 0;
    }
    if (quadricep === "") {
        quadricep = 0;
    }
    if (suprailiac === "") {
        suprailiac = 0;
    }



    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/jp4python`,
        true);
    xhr.onerror = function() {
        alert(xhr.responseText);
    };
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            try {
                var response = JSON.parse(e.target.responseText);

                if (!response['payment_failed']) {
                    el("total-bodyfatpercent").innerHTML = `${response['answer']} %`;
                    el("total-fatmass").innerHTML = `${response['fatmass']}`;
                    el("total-leanmass").innerHTML = `${response['leanmass']}`;

                    el("total-bmi").innerHTML = `${response['bmi']}`;
                    el("bmi-category").innerHTML = `${response['bmi-category']}`;

                    el("weight-unit-1").innerHTML = `${response['weightunit']}`;

                    el("weight-unit-2").innerHTML = `${response['weightunit']}`;
                } else {
                    show_failed_payment_notification();
                }
            } catch (e) {
                show_failed_payment_notification();
            }

        }
    };

    var fileData = new FormData();
    fileData.append('gender', gender);
    fileData.append('age', age);
    fileData.append('weight_choice', weight_choice);
    fileData.append('weight', weight);
    fileData.append('height_choice', height_choice);
    fileData.append('height', height);
    fileData.append('abdomen', abdomen);
    fileData.append('tricep', tricep);
    fileData.append('quadricep', quadricep);
    fileData.append('suprailiac', suprailiac);
    fileData.append("payment_id", paymentData.paymentId)
    xhr.send(fileData);

}


function jp7(paymentData) {



    var gender;
    if (document.getElementById('male_jp7').checked) {
        gender = document.getElementById('male_jp7').value;
    } else if (document.getElementById('female_jp7').checked) {
        gender = document.getElementById('female_jp7').value;
    }

    var age = document.getElementById('age_jp7').value;

    var weight_choice;
    if (document.getElementById('kgs_jp7').checked) {
        weight_choice = document.getElementById('kgs_jp7').value;
    } else if (document.getElementById('pounds_jp7').checked) {
        weight_choice = document.getElementById('pounds_jp7').value;
    }

    var weight = document.getElementById('weight_jp7').value;

    var height_choice;
    if (document.getElementById('feet_inches_jp7').checked) {
        height_choice = document.getElementById('feet_inches_jp7').value;
    } else if (document.getElementById('cmjp_jp7').checked) {
        height_choice = document.getElementById('cmjp_jp7').value;
    }
    var height = document.getElementById('height_jp7').value;


    var pectoral = document.getElementById('pectoraljp7').value;
    var midaxilla = document.getElementById('midaxilla_jp7').value;
    var tricep = document.getElementById('tricep_jp7').value;
    var subscapular = document.getElementById('subscapular_jp7').value;
    var abdomen = document.getElementById('abdomen_jp7').value;
    var suprailiac = document.getElementById('suprailiac_jp7').value;
    var quadricep = document.getElementById('quadricep_jp7').value;



    if (pectoral === "") {
        pectoral = 0;
    } else if (midaxilla === "") {
        midaxilla = 0;
    } else if (tricep === "") {
        tricep = 0;
    } else if (subscapular === "") {
        subscapular = 0;
    } else if (abdomen === "") {
        abdomen = 0;
    } else if (suprailiac === "") {
        suprailiac = 0;
    } else if (suprailiac === "") {
        quadricep = 0;
    }




    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/jp7python`,
        true);
    xhr.onerror = function() {
        alert(xhr.responseText);
    };
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            try {
                var response = JSON.parse(e.target.responseText);

                if (!response['payment_failed']) {
                    el("total-bodyfatpercent").innerHTML = `${response['answer']} %`;
                    el("total-fatmass").innerHTML = `${response['fatmass']}`;
                    el("total-leanmass").innerHTML = `${response['leanmass']}`;

                    el("total-bmi").innerHTML = `${response['bmi']}`;
                    el("bmi-category").innerHTML = `${response['bmi-category']}`;

                    el("weight-unit-1").innerHTML = `${response['weightunit']}`;

                    el("weight-unit-2").innerHTML = `${response['weightunit']}`;
                } else {
                    show_failed_payment_notification();
                }
            } catch (e) {
                show_failed_payment_notification();
            }
        }
    };

    var fileData = new FormData();
    fileData.append('gender', gender);
    fileData.append('age', age);
    fileData.append('weight_choice', weight_choice);
    fileData.append('weight', weight);
    fileData.append('height_choice', height_choice);
    fileData.append('height', height);
    fileData.append('pectoral', pectoral);
    fileData.append('midaxilla', midaxilla);
    fileData.append('tricep', tricep);
    fileData.append('subscapular', subscapular);
    fileData.append('abdomen', abdomen);
    fileData.append('suprailiac', suprailiac);
    fileData.append('quadricep', quadricep);
    fileData.append("payment_id", paymentData.paymentId)
    xhr.send(fileData);

}


function p9(paymentData) {

    var gender;
    if (document.getElementById('malep9').checked) {
        gender = document.getElementById('malep9').value;
    } else if (document.getElementById('femalep9').checked) {
        gender = document.getElementById('femalep9').value;
    }

    var age = document.getElementById('agep9').value;

    var weight_choice;
    if (document.getElementById('kgsp9').checked) {
        weight_choice = document.getElementById('kgsp9').value;
    } else if (document.getElementById('poundsp9').checked) {
        weight_choice = document.getElementById('poundsp9').value;
    }

    var weight = document.getElementById('weightp9').value;

    var height_choice;
    if (document.getElementById('feetinchesp9').checked) {
        height_choice = document.getElementById('feetinchesp9').value;
    } else if (document.getElementById('cmjpp9').checked) {
        height_choice = document.getElementById('cmjpp9').value;
    }
    var height = document.getElementById('heightp9').value;


    var pectoral = document.getElementById('pectoralp9').value;
    var abdomen = document.getElementById('abdomenp9').value;
    var quadricep = document.getElementById('quadricepp9').value;
    var bicep = document.getElementById('bicepp9').value;
    var tricep = document.getElementById('tricepp9').value;
    var subscapular = document.getElementById('subscapularp9').value;
    var suprailiac = document.getElementById('suprailiacp9').value;
    var lowerback = document.getElementById('lowerbackp9').value;
    var calf = document.getElementById('calfp9').value;



    if (pectoral === "") {
        pectoral = 0;
    } else if (abdomen === "") {
        abdomen = 0;
    } else if (quadricep === "") {
        quadricep = 0;
    } else if (bicep === "") {
        bicep = 0;
    } else if (tricep === "") {
        tricep = 0;
    } else if (subscapular === "") {
        subscapular = 0;
    } else if (suprailiac === "") {
        suprailiac = 0;
    } else if (lowerback === "") {
        lowerback = 0;
    } else if (calf === "") {
        calf = 0;
    }



    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/p9python`,
        true);
    xhr.onerror = function() {
        alert(xhr.responseText);
    };
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            try {
                var response = JSON.parse(e.target.responseText);

                if (!response['payment_failed']) {
                    el("total-bodyfatpercent").innerHTML = `${response['answer']} %`;
                    el("total-fatmass").innerHTML = `${response['fatmass']}`;
                    el("total-leanmass").innerHTML = `${response['leanmass']}`;

                    el("total-bmi").innerHTML = `${response['bmi']}`;
                    el("bmi-category").innerHTML = `${response['bmi-category']}`;

                    el("weight-unit-1").innerHTML = `${response['weightunit']}`;

                    el("weight-unit-2").innerHTML = `${response['weightunit']}`;
                } else {
                    show_failed_payment_notification();
                }
            } catch (e) {
                show_failed_payment_notification();
            }


        }
    };

    var fileData = new FormData();
    fileData.append('gender', gender);
    fileData.append('age', age);
    fileData.append('weight_choice', weight_choice);
    fileData.append('weight', weight);
    fileData.append('height_choice', height_choice);
    fileData.append('height', height);
    fileData.append('pectoral', pectoral);
    fileData.append('abdomen', abdomen);
    fileData.append('quadricep', quadricep);
    fileData.append('bicep', bicep);
    fileData.append('tricep', tricep);
    fileData.append('subscapular', subscapular);
    fileData.append('suprailiac', suprailiac);
    fileData.append('lowerback', lowerback);
    fileData.append('calf', calf);
    fileData.append("payment_id", paymentData.paymentId)
    xhr.send(fileData);

}



function dw4(paymentData) {

    var gender;
    if (document.getElementById('maledw4').checked) {
        gender = document.getElementById('maledw4').value;
    } else if (document.getElementById('femaledw4').checked) {
        gender = document.getElementById('femaledw4').value;
    }

    var age = document.getElementById('agedw4').value;

    var weight_choice;
    if (document.getElementById('kgsdw4').checked) {
        weight_choice = document.getElementById('kgsdw4').value;
    } else if (document.getElementById('poundsdw4').checked) {
        weight_choice = document.getElementById('poundsdw4').value;
    }

    var weight = document.getElementById('weightdw4').value;

    var height_choice;
    if (document.getElementById('feetinchesdw4').checked) {
        height_choice = document.getElementById('feetinchesdw4').value;
    } else if (document.getElementById('cmjpdw4').checked) {
        height_choice = document.getElementById('cmjpdw4').value;
    }

    var height = document.getElementById('heightdw4').value;
    var tricep = document.getElementById('tricepdw4').value;
    var bicep = document.getElementById('bicepdw4').value;
    var subscapular = document.getElementById('subscapulardw4').value;
    var suprailiac = document.getElementById('suprailiacdw4').value;



    if (tricep === "") {
        tricep = 0;
    }
    if (bicep === "") {
        bicep = 0;
    }
    if (subscapular === "") {
        subscapular = 0;
    }
    if (suprailiac === "") {
        suprailiac = 0;
    }



    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/dw4python`,
        true);
    xhr.onerror = function() {
        alert(xhr.responseText);
    };
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            try {
                var response = JSON.parse(e.target.responseText);

                if (!response['payment_failed']) {
                    el("total-bodyfatpercent").innerHTML = `${response['answer']} %`;
                    el("total-fatmass").innerHTML = `${response['fatmass']}`;
                    el("total-leanmass").innerHTML = `${response['leanmass']}`;

                    el("total-bmi").innerHTML = `${response['bmi']}`;
                    el("bmi-category").innerHTML = `${response['bmi-category']}`;

                    el("weight-unit-1").innerHTML = `${response['weightunit']}`;

                    el("weight-unit-2").innerHTML = `${response['weightunit']}`;
                } else {
                    show_failed_payment_notification();
                }
            } catch (e) {
                show_failed_payment_notification();
            }
        }
    };

    var fileData = new FormData();
    fileData.append('gender', gender);
    fileData.append('age', age);
    fileData.append('weight_choice', weight_choice);
    fileData.append('weight', weight);
    fileData.append('height_choice', height_choice);
    fileData.append('height', height);
    fileData.append('tricep', tricep);
    fileData.append('bicep', bicep);
    fileData.append('subscapular', subscapular);
    fileData.append('suprailiac', suprailiac);
    fileData.append("payment_id", paymentData.paymentId)
    xhr.send(fileData);

}


function faceanalyze(paymentData) {

    // var uploadFiles = dataURItoBlob(newbase64);

    var uploadFiles = el("upload").files;


    el("analyze-button").innerHTML = "ESTIMATING...";
    var xhr = new XMLHttpRequest();
    var loc = window.location;
    xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/faceanalyze`,
        true);
    xhr.onerror = function() {
        alert(xhr.responseText);
    };
    xhr.onload = function(e) {
        if (this.readyState === 4) {
            try {
                var response = JSON.parse(e.target.responseText);

                if (!response['payment_failed']) {
                    el("result-text").innerHTML = `Your body fat percentage (range) based on your face is: <br><br>`;
                    el("result-label").innerHTML = `${response['result']} %`;
                } else {
                    show_failed_payment_notification();
                }
            } catch (e) {
                show_failed_payment_notification();
            }

        }
        el("analyze-button").innerHTML = "UPLOAD IMAGE";
    };

    var fileData = new FormData();
    fileData.append("file", uploadFiles[0]);
    fileData.append("payment_id", paymentData.paymentId)
    xhr.send(fileData);
}

function show_failed_payment_notification() {
    $("#notification").fadeIn("slow", function () {
        $("#notification_content").html('"We were unable to process your payment request. If your payment was actually processed please contact us contact@estimatebodyfat.com"')
    });
    $(".dismiss").click(function () {
        $("#notification").fadeOut("slow");
    });
}
×
Drag and Drop
The image will be downloaded
