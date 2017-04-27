import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import Markdown from 'react-markdown'

const md = `
# Overview

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta, diam et
dignissim rutrum, leo felis tristique eros, nec vulputate libero odio non risus.
Suspendisse nec purus semper, convallis nibh ac, tempor dui. Nam eleifend
finibus mauris non lobortis. Phasellus vehicula, est in hendrerit dictum, tellus
neque tempus felis, ut condimentum turpis ante in purus. Nam ac congue magna.
Quisque ornare sem et diam elementum aliquam. Etiam consectetur nisi sit amet
nisi vestibulum consectetur. Integer ut turpis sed est suscipit luctus eget id
lorem. Phasellus dapibus maximus urna sed rhoncus. Nullam non urna sit amet
turpis gravida fringilla eget in urna.

Integer vel elit eu tellus malesuada aliquam eu et est. Sed ante ligula, lacinia
sed tempor at, tempus in eros. Nullam pellentesque commodo magna, venenatis
aliquam erat maximus vitae. Aliquam erat volutpat. Duis dolor nibh, cursus in
consectetur et, aliquet feugiat erat. Maecenas gravida arcu a magna varius, ut
gravida nisi vulputate. Proin nec eros nunc. Etiam ultrices at justo sit amet
auctor.

Nunc eu lacus posuere, lacinia diam rhoncus, placerat elit. Curabitur blandit
elit vitae diam fringilla accumsan. Integer sit amet orci magna. Ut et mauris
vestibulum dolor condimentum sodales eget in urna. Phasellus condimentum nulla
vel nulla faucibus luctus. Etiam vitae nisl id enim ullamcorper hendrerit. Cras
eget urna auctor, lacinia nisl vel, malesuada eros. Sed molestie mi sit amet
sapien mollis vehicula. In sagittis libero vitae sem placerat, eu placerat odio
vulputate. Quisque dictum sem sed est mattis, quis rutrum urna faucibus.

Maecenas facilisis ac nulla tempor dictum. Vestibulum et felis sit amet leo
pharetra placerat. Integer nec massa dolor. Praesent molestie aliquet varius.
Quisque sit amet porta sem. Nam eget ipsum augue. Aenean interdum, augue a
tempus consectetur, odio purus pulvinar metus, at aliquet nisi eros id dui. Cras
volutpat purus sit amet facilisis sollicitudin. Nullam vestibulum porta purus,
et faucibus justo blandit vitae. Curabitur sapien sapien, finibus sit amet
iaculis sit amet, porta id libero. Sed accumsan odio at dignissim pharetra.
Quisque a consequat arcu. Nunc elementum nisi eleifend, ornare quam a, accumsan
dui. Aliquam sit amet dui nec ex rutrum sagittis. Nulla nec molestie lorem, quis
mattis eros. Nullam sagittis nunc sed tempor venenatis.

Sed faucibus ligula et leo eleifend scelerisque. Donec malesuada dui id tellus
ultricies, in iaculis lectus venenatis. Duis fringilla sapien eget odio gravida
tristique. Nulla elementum magna quis justo tristique tincidunt. Proin ac auctor
dui. Quisque ligula est, porta sit amet vulputate quis, fringilla sit amet
magna. Phasellus condimentum, elit vel ultrices venenatis, diam quam iaculis mi,
pretium rhoncus risus nulla et metus. Nulla porta egestas est in pulvinar.
`

export default class Overview extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>Overview - FastStack</title>
        </Helmet>
        <Markdown className="content" source={md}/>
      </div>
    )
  }
}
