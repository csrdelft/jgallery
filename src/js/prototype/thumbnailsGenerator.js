var ThumbnailsGenerator = ( function( outerHtml, jLoader ) {
    var $ = jQuery;
    
    $.fn.outerHtml = outerHtml;
    $.fn.jLoader = jLoader;
    
    var ThumbnailsGenerator = function( jGallery, options ) {
        this.options = $.extend( {}, {
            thumbsHidden: true
        }, options );
        this.jGallery = jGallery;
        this.isSlider = jGallery.isSlider();
        this.$element = jGallery.$this;
        this.booIsAlbums = jGallery.booIsAlbums;
        this.$tmp;
        this.intI = 1;
        this.intJ = 1;
        this.intNo;
        this.$thumbnailsContainerInner = this.jGallery.$jgallery.find( '.jgallery-thumbnails .jgallery-container-inner' );
        this.start();
    };

    ThumbnailsGenerator.prototype = {
        start: function() {
            this.$thumbnailsContainerInner.html( '' );
            if (this.jGallery.options.items) {
                this.processOptions();
            }
            else {
                this.processHtml();
            }
            this.refreshThumbsSize();
        },
        
        processOptions: function() {
            if ( this.booIsAlbums ) {
                this.jGallery.options.items.forEach(function(item) {
                    
                });
            }
            else {
                this.jGallery.options.items.forEach(function(item) {
                    
                });
            }
        },
        
        processHtml: function() {
            var self = this;
            var selector = this.jGallery.isSlider() ? '.album:has(img)' : '.album:has(a:has(img))';
            
            $( 'body' ).append( '<div id="jGalleryTmp" style="position: absolute; top: 0; left: 0; width: 0; height: 0; z-index: -1; overflow: hidden;">' + this.$element.html() + '</div>' );
            this.$tmp = $( '#jGalleryTmp' );
            if ( this.booIsAlbums ) {
                this.$tmp.find( selector ).each( function() {
                    self.insertAlbum( $( this ) );
                } );
            }
            else {
                this.insertImages( this.$tmp, this.$thumbnailsContainerInner );                    
            }
            this.$tmp.remove();
        },

        insertAlbum: function( $this ) {
            var strTitle = $this.is( '[data-jgallery-album-title]' ) ? $this.attr( 'data-jgallery-album-title' ) : 'Album ' + this.intJ;
            var $album = this.$thumbnailsContainerInner.append( '<div class="album" data-jgallery-album-title="' + strTitle + '"></div>' ).children( ':last-child' );

            if ( this.intJ === 1 ) {
                $album.addClass( 'active' );
            }
            this.insertImages( $this, $album );
            this.intJ++;
        },

        insertImages: function( $images, $container ) {
            var self = this;
            var selector = this.jGallery.isSlider() ? 'img' : 'a:has(img)';

            this.intNo = 1;
            $images.find( selector ).each( function() {
                self.insertImage( $( this ), $container );
            } );            
        },

        insertImage: function( $this, $container ) {
            var $a = $();
            var $parent = $this.parent();
            var $img = $this.is( 'img' ) ? $this : $this.find( 'img' ).eq( 0 );
            
            $a = $container.append( (new Thumb({
                url: $this.is( 'img' ) && this.isSlider ? $this.attr( 'src' ) : $this.attr( 'href' ),
                link: $this.is( 'img' ) && this.isSlider && $parent.is( 'a' ) ? $parent.attr( 'href' ) : undefined,
                target: $this.is( 'img' ) && this.isSlider && $parent.is( 'a' ) && $parent.is( '[target]' ) ? $parent.attr( 'target' ) : undefined,
                thumbUrl: $img.attr( 'src' ),
                title: $img.attr( 'alt' ),
                bgColor: $img.attr( 'data-jgallery-bg-color' ),
                textColor: $img.attr( 'data-jgallery-text-color' )
            })).render() ).children( ':last-child' );
            $a.jLoader( {
                start: function() {
                    $a.overlay( {
                        fadeIn: false,
                        fadeOut: false,
                        show: true,
                        showLoader: true
                    } );
                },
                success: function() {
                    $a.overlay( {
                        hide: true
                    } );
                }
            } );
            $container.children( ':last-child' ).attr( 'data-jgallery-photo-id', this.intI++ ).attr( 'data-jgallery-number', this.intNo++ );
        },

        refreshThumbsSize: function() {
            var options = this.jGallery.options;

            this.$thumbnailsContainerInner.find( 'img' ).each( function() {
                var $image = $( this );
                var image = new Image();

                image.src = $image.attr( 'src' );          
                if ( ( image.width / image.height ) < ( options.thumbWidth / options.thumbHeight ) ) {
                    $image.addClass( 'thumb-vertical' ).removeClass( 'thumb-horizontal' );
                }
                else {
                    $image.addClass( 'thumb-horizontal' ).removeClass( 'thumb-vertical' );                
                }
                if ( ( image.width / image.height ) < ( options.thumbWidthOnFullScreen / options.thumbHeightOnFullScreen ) ) {
                    $image.addClass( 'thumb-on-full-screen-vertical' ).removeClass( 'thumb-on-full-screen-horizontal' );
                }
                else {
                    $image.addClass( 'thumb-on-full-screen-horizontal' ).removeClass( 'thumb-on-full-screen-vertical' );                
                }
            } );
        }
    };
    
    return ThumbnailsGenerator;
} )( outerHtml, jLoader );