let currentActiveMarker = null;
// ===== DANH SÁCH ĐỊA ĐIỂM =====
const dongBangSongHong = document.getElementById("dongBangSongHong");
const bacTrungBo = document.getElementById("bacTrungBo");

function addLocationItem(name, coords, marker, region) {
  const li = document.createElement("li");
  li.textContent = name;

  li.onclick = function () {
    map.flyTo(coords, 12, { duration: 1.5 });
    highlightMarker(marker);
    marker.fire("click");
  };

  if (region === "dongbang") {
    dongBangSongHong.appendChild(li);
  }

  if (region === "bactrungbo") {
    bacTrungBo.appendChild(li);
  }
}

function highlightMarker(marker) {
  // nếu đã có marker active trước đó
  if (currentActiveMarker) {
    currentActiveMarker.setIcon(normalIcon);
  }

  // phóng to marker mới
  marker.setIcon(activeIcon);

  currentActiveMarker = marker;
}
// ================= IMAGE DATA =================
let currentImages = [];
let currentIndex = 0;

// =======================
// 1. GIỚI HẠN VIỆT NAM
// =======================

// Góc Tây Nam và Đông Bắc Việt Nam
var boundsVN = L.latLngBounds([8.18, 102.14], [23.39, 109.46]);

// Khởi tạo bản đồ
var map = L.map("map", {
  center: [16.0471, 108.2068],
  zoom: 6,
  minZoom: 5,
  maxZoom: 12,
  maxBounds: boundsVN,
  maxBoundsViscosity: 1.0,
});

// Nền bản đồ OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
  noWrap: true,
}).addTo(map);

// =======================
// 2. LOAD GEOJSON VIỆT NAM
// =======================

fetch("data/vietnam.geojson")
  .then((res) => res.json())
  .then((data) => {
    // Layer Việt Nam
    var vietnamLayer = L.geoJSON(data, {
      style: {
        color: "#ff0000",
        weight: 1,
        fillColor: "#a0fca0",
        fillOpacity: 0.25,
      },

      onEachFeature: function (feature, layer) {
        // Popup tên tỉnh
        if (feature.properties.name) {
          layer.bindPopup("<b>" + feature.properties.name + "</b>");
        }

        // Hover highlight
        layer.on({
          mouseover: function (e) {
            e.target.setStyle({
              fillColor: "#ffff60",
              fillOpacity: 0.6,
            });
          },
          mouseout: function (e) {
            vietnamLayer.resetStyle(e.target);
          },
        });
      },
    }).addTo(map);

    // Zoom vừa khít Việt Nam
    map.fitBounds(vietnamLayer.getBounds());

    // Che phần ngoài Việt Nam
    maskOutsideVietnam(data);
  });

// =======================
// 3. MASK NGOÀI VIỆT NAM
// =======================

function maskOutsideVietnam(geojson) {
  // Polygon toàn thế giới
  var world = [
    [
      [-90, -180],
      [-90, 180],
      [90, 180],
      [90, -180],
      [-90, -180],
    ],
  ];

  // Ghép lỗ là Việt Nam
  var mask = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: world.concat(geojson.features[0].geometry.coordinates),
    },
  };

  // Layer che
  L.geoJSON(mask, {
    style: {
      fillColor: "#ffffff",
      fillOpacity: 1,
      stroke: false,
    },
  }).addTo(map);
}

// ICON BÌNH THƯỜNG
var normalIcon = L.icon({
  iconUrl: "data/position.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

// ICON PHÓNG TO
var activeIcon = L.icon({
  iconUrl: "data/position.png",
  iconSize: [70, 70],
  iconAnchor: [35, 70],
});
// ================= MARKER =================
// ================= Chí Linh =================
var chiLinh = [21.109, 106.394];

var markerChiLinh = L.marker(chiLinh, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerChiLinh);
    map.flyTo(chiLinh, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Chí Linh – Côn Sơn, Hải Dương (Hải Phòng hiện nay)",

      slides: [
        {
          img: "img/Suoiconson.jpg",
          text: `
        <h3>1.Sự xuất hiện của địa danh Côn Sơn trong tác phẩm <a href="tacpham.html#consonca">Côn Sơn ca</a> của Nguyễn Trãi</h3>

<p>Địa danh <b>Côn Sơn</b> xuất hiện ngay từ đầu bài và được lặp lại nhiều lần:</p>

<ul>
  <li><i>“Côn Sơn hữu tuyền”</i> (Côn Sơn có suối)</li>
  <li><i>“Côn Sơn hữu thạch”</i> (Côn Sơn có đá)</li>
</ul>

<p>Qua đó, Côn Sơn hiện lên với những hình ảnh đặc trưng của thiên nhiên:</p>

<ul>
  <li><b>Suối</b> chảy rì rầm như tiếng đàn.</li>
  <li><b>Đá</b> rêu phẳng sạch như chiếu ngồi.</li>
  <li><b>Thông</b> và <b>trúc xanh</b> mát tạo không gian thanh tĩnh.</li>
</ul>

<p>
Côn Sơn không chỉ là một địa danh cụ thể mà còn được miêu tả như
<b>một không gian sống, một thế giới thiên nhiên thanh sạch và yên bình</b>.
</p>
        `,
        },

        {
          img: "img/Suoiconson2.jpg",
          text: `
          <hr>
          <h3>2.Tư tưởng hòa hợp với thiên nhiên</h3>
        <p>
Ngay từ đầu bài thơ, thiên nhiên Côn Sơn được miêu tả bằng những hình ảnh rất cụ thể:
<b>suối, đá, thông, trúc</b>.
</p>

<ul>
  <li><i>“Côn Sơn hữu tuyền… Ngô dĩ vi cầm huyền”</i> → tiếng suối được cảm nhận như tiếng đàn cầm.</li>
  <li><i>“Côn Sơn hữu thạch… Ngô dĩ vi đan tịch”</i> → đá rêu phẳng được xem như chiếu êm để ngồi.</li>
</ul>

<p>
Những hình ảnh này cho thấy thiên nhiên không xa lạ mà trở thành
<b>người bạn gần gũi của con người</b>, mang lại cảm giác thanh tĩnh và dễ chịu.
</p>

<p>
Nguyễn Trãi không chỉ ngắm cảnh mà còn trực tiếp sống trong thiên nhiên:
</p>

<ul>
  <li>nằm nghỉ dưới bóng thông</li>
  <li>ngâm thơ bên rừng trúc</li>
</ul>

<p>
Các động từ <i>“yển tức”</i> (nghỉ ngơi), <i>“ngâm tiêu”</i> (ngâm thơ) cho thấy con người
thả mình vào nhịp sống của núi rừng, tìm thấy sự thư thái và tự do trong thiên nhiên.
</p>

<p>
Từ cảnh Côn Sơn, Nguyễn Trãi bày tỏ quan niệm sống:
</p>

<ul>
  <li><i>“Vạn chung cửu đỉnh hà tất nhiên”</i> → danh lợi, quyền quý không phải điều quan trọng.</li>
  <li><i>“Ẩm thuỷ phạn sơ tuỳ phận túc”</i> → sống giản dị, thuận theo tự nhiên là đủ.</li>
</ul>

<p>
Thiên nhiên Côn Sơn trở thành không gian đối lập với cuộc sống danh lợi chốn quan trường,
nơi con người tìm được <b>sự thanh cao và tự do tinh thần</b>.
</p>

<p>
Ở phần cuối bài thơ, từ không gian núi rừng yên tĩnh, Nguyễn Trãi suy nghĩ về:
</p>

<ul>
  <li>sự ngắn ngủi của đời người</li>
  <li>sự vô nghĩa của danh lợi</li>
  <li>vòng tuần hoàn của cuộc sống</li>
</ul>

<p>
Điều này cho thấy thiên nhiên không chỉ là nơi nghỉ ngơi mà còn là
<b>nguồn cảm hứng cho những suy tư triết lí sâu sắc về cuộc đời</b>.
</p>
        `,
        },

        {
          img: "img/Suoiconson3.jpg",
          text: `
          <hr>
        <h3>3. Quan niệm sống và tư tưởng nhân nghĩa trong Côn Sơn ca</h3>

<h4> Đề cao lối sống thanh cao, thuận theo tự nhiên</h4>
<p>Trong bài thơ, Nguyễn Trãi nhiều lần khẳng định quan niệm sống giản dị:</p>

<ul>
  <li><i>“Ẩm thuỷ phạn sơ tuỳ phận túc”</i>
  → uống nước suối, ăn cơm rau cũng đủ.</li>
</ul>

<p>
Điều này thể hiện tư tưởng nhân nghĩa ở chỗ: con người sống thuận theo lẽ tự nhiên,
không chạy theo danh lợi vật chất, giữ cho tâm hồn trong sạch và thanh cao.
</p>

<hr>

<h4> Phê phán sự tham lam và chạy theo quyền lực</h4>
<p>Nguyễn Trãi nhắc đến những nhân vật nổi tiếng giàu sang như:</p>

<ul>
  <li>Đổng Trác</li>
  <li>Nguyên Tái</li>
</ul>

<p>
Đây là những người tượng trưng cho quyền lực và của cải lớn, nhưng cuối cùng
danh tiếng lại không tốt đẹp. Qua đó, tác giả <b>phê phán lối sống tham lam,
chạy theo danh lợi</b>, trái với đạo lý nhân nghĩa.
</p>

<hr>

<h4> Tôn trọng những con người giữ khí tiết và đạo nghĩa</h4>
<p>Ngược lại, Nguyễn Trãi nhắc đến hai nhân vật:</p>

<ul>
  <li>Bá Di</li>
  <li>Thúc Tề</li>
</ul>

<p>
Hai người thà chết đói chứ không ăn thóc của triều đại mà họ cho là không chính đáng.
Việc nhắc đến họ nhằm <b>ca ngợi khí tiết, lòng trung nghĩa và sự giữ gìn đạo lý</b>.
</p>

<hr>

<h4>4. Thể hiện quan niệm nhân sinh nhân văn</h4>
<p>Trong đoạn cuối, Nguyễn Trãi suy ngẫm:</p>

<ul>
  <li>đời người ngắn ngủi</li>
  <li>vinh nhục rồi cũng qua đi</li>
  <li>con người cuối cùng cũng như cỏ cây</li>
</ul>

<p>
Những suy tư này thể hiện <b>tầm nhìn nhân văn và triết lí nhân nghĩa</b>:
con người nên sống đúng đạo lý, giữ tâm hồn thanh sạch thay vì
chạy theo danh lợi phù du.
</p>
        `,
        },
      ],
    });
    openVideoSidebar("video/ConSonCa.mp4", "🎬Ngâm thơ Côn Sơn Ca");
  });
addLocationItem("Chí Linh – Côn Sơn", chiLinh, markerChiLinh, "dongbang");
// ===== LAM KINH - THANH HÓA =====
var lamKinh = [20.0076, 105.2889];

var markerLamKinh = L.marker(lamKinh, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerLamKinh);
    map.flyTo(lamKinh, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Lam Kinh – Lam Sơn (Thanh Hóa)",

      slides: [
        {
          img: "img/Lamkinh.jpg",
          text: `
        <h3>Lịch sử của Lam Kinh – Lam Sơn gắn với cuộc đời Nguyễn Trãi và khởi nghĩa Lam Sơn</h3>

<hr>

<h3>1. Lam Sơn – nơi khởi nguồn của cuộc khởi nghĩa chống quân Minh</h3>

<p><b>Lam Sơn</b> (thuộc Thanh Hóa) là quê hương của <b>Lê Lợi</b>. Tại đây, năm 1418, Lê Lợi đã dựng cờ khởi nghĩa chống lại ách đô hộ của nhà Minh, mở đầu cuộc <b>khởi nghĩa Lam Sơn</b> kéo dài gần mười năm.</p>

<p>Địa hình Lam Sơn gồm núi rừng hiểm trở, sông suối và thung lũng, rất thuận lợi cho chiến tranh du kích. Chính địa thế này đã giúp nghĩa quân:</p>

<ul>
<li>xây dựng căn cứ lâu dài</li>
<li>bảo toàn lực lượng trong giai đoạn đầu khó khăn</li>
<li>từng bước mở rộng lực lượng và địa bàn hoạt động.</li>
</ul>

<p>Lam Sơn vì vậy được xem là <b>cái nôi của cuộc kháng chiến giành lại độc lập cho Đại Việt</b>.</p>

<hr>

<h3>2. Nguyễn Trãi tham gia khởi nghĩa Lam Sơn</h3>

<p>Khoảng năm 1420, <b>Nguyễn Trãi</b> tìm đến Lam Sơn để phò tá Lê Lợi. Ông trở thành <b>quân sư quan trọng</b> của nghĩa quân.</p>

<p>Vai trò của Nguyễn Trãi trong khởi nghĩa rất lớn:</p>

<ul>
<li>đề ra chiến lược và sách lược quân sự</li>
<li>soạn thảo nhiều thư từ, chiếu dụ kêu gọi nhân dân và quân địch quy thuận</li>
<li>xây dựng tư tưởng <i>“lấy nhân nghĩa thắng hung tàn, lấy chí nhân thay cường bạo”</i></li>
</ul>

<p>Những văn kiện này được tập hợp trong tác phẩm nổi tiếng <b><i>Quân trung từ mệnh tập</i></b></p>

<p>Nhờ chiến lược đúng đắn và sự đoàn kết của nhân dân, nghĩa quân Lam Sơn ngày càng lớn mạnh và giành nhiều thắng lợi.</p>
        `,
        },

        {
          img: "img/Lamkinh2.jpg",
          text: `
        <h3>3. Lam Kinh – kinh đô thứ hai của triều Lê</h3>

<p>Sau khi đánh bại quân Minh và giành độc lập năm 1427, <b>Lê Lợi</b> lên ngôi vua, lập ra <b>Nhà Lê sơ</b>.</p>

<p>Ông cho xây dựng <b>Lam Kinh</b> tại quê hương Lam Sơn. Lam Kinh trở thành:</p>

<ul>
<li>kinh đô thứ hai của triều Lê (bên cạnh <b>Thăng Long</b>)</li>
<li>nơi tổ chức các nghi lễ quan trọng của hoàng tộc</li>
<li>khu lăng tẩm của các vua và hoàng hậu nhà Lê.</li>
</ul>

<p>Lam Kinh vì vậy vừa là <b>biểu tượng chiến thắng của khởi nghĩa Lam Sơn</b>, vừa là nơi ghi dấu công lao của những người sáng lập triều đại.</p>

<hr>

<h3>4. Mối liên hệ giữa Lam Sơn – Lam Kinh và cuộc đời Nguyễn Trãi</h3>

<p>Lam Sơn là nơi đánh dấu <b>bước ngoặt lớn trong cuộc đời Nguyễn Trãi</b>. Tại đây ông:</p>

<ul>
<li>tìm thấy con đường cứu nước sau khi đất nước bị nhà Minh đô hộ</li>
<li>gắn bó với Lê Lợi và nghĩa quân trong suốt cuộc kháng chiến</li>
<li>đóng góp trí tuệ để đưa cuộc khởi nghĩa đến thắng lợi.</li>
</ul>

<p>Những tư tưởng lớn của Nguyễn Trãi như:</p>

<ul>
<li>nhân nghĩa</li>
<li>lấy dân làm gốc</li>
<li>độc lập dân tộc</li>
</ul>

<p>đều được hình thành và phát triển mạnh mẽ trong thời gian ông hoạt động tại Lam Sơn.</p>
        `,
        },

        {
          img: "img/Lamkinh3.jpg",
          text: `
        <h3>Trích đoạn <i>Bình Ngô đại cáo</i></h3>
<hr>
<blockquote class="classical-text">
Dư:<br>
Phấn tích Lam Sơn,<br>
Thê thân hoang dã.<br>
Niệm thế thù khởi khả cộng đới,<br>
Thệ nghịch tặc nan dữ câu sinh.<br>
Thống tâm tật thủ giả thuỳ thập dư niên,<br>
Thường đảm ngoạ tân giả cái phi nhất nhật.<br>
Phát phẫn vong thực, mỗi nghiên đàm thao lược chi thư,<br>
Tức cổ nghiệm kim, tế suy cứu hưng vong chi lý.<br>
Đồ hồi chi chí,<br>
Ngộ mị bất vong.<br>
Đương nghĩa kỳ sơ khởi chi thì,<br>
Chính tặc thế phương trương chi nhật.
</blockquote>
<hr>
<p><b>Câu thơ mở đầu:</b></p>

<blockquote>
“Thê thân hoang dã”
</blockquote>

<p>Gợi ra hình ảnh <b>Lam Sơn</b> với núi rừng hoang sơ, hùng vĩ và hiểm trở. Đây là đặc điểm địa lý thực tế của vùng núi <b>Thanh Hóa</b>, nơi trở thành căn cứ đầu tiên của cuộc khởi nghĩa Lam Sơn. Chính địa thế núi rừng này đã tạo điều kiện cho nghĩa quân tồn tại trong giai đoạn đầu khó khăn của cuộc khởi nghĩa.</p>

<hr>
<p><b>Những câu thơ tiếp theo:</b></p>

<blockquote>
“Niệm thế thù khởi khả cộng đới,<br>
Thệ nghịch tặc nan dữ câu sinh.”
</blockquote>
<p>Thể hiện ý chí <b>không thể chung sống với giặc</b>. Qua đó, Lam Sơn trở thành nơi bùng lên ý chí phục thù và khôi phục đất nước. Đây cũng là nơi <b>Lê Lợi dựng cờ khởi nghĩa</b>, tập hợp nghĩa sĩ và phát động cuộc chiến chống quân Minh.</p>
<hr>
<h3>Hai câu cuối đặc biệt quan trọng</h3>

<blockquote>
“Dương nghĩa kỳ sở khởi chi thì,<br>
Chính tắc thế phương trương chi nhật.”
</blockquote>

<p><b>Nghĩa là:</b> từ lúc ban đầu đã nêu cao chính nghĩa, và khi thời cơ đến thì chính nghĩa ấy lan rộng khắp nơi.</p>

<p>Điều này phản ánh tư tưởng lớn của <b>Nguyễn Trãi</b>:</p>

<ul>
<li>cuộc khởi nghĩa Lam Sơn không chỉ là chiến tranh vũ lực</li>
<li>mà là cuộc chiến <b>chính nghĩa vì dân tộc và nhân dân</b>.</li>
</ul>

<p>Tư tưởng này sau đó được ông phát triển rõ trong <i>Bình Ngô đại cáo</i> với câu nổi tiếng:</p>

<blockquote>
“Đem đại nghĩa để thắng hung tàn,<br>
Lấy chí nhân để thay cường bạo.”
</blockquote>
`,
        },
      ],
    });
    openVideoSidebar(
      "video/Lamkinh.mp4",
      "🎬Lam Kinh - dấu tích còn lại và giá trị vĩnh hằng",
    );
  });

addLocationItem("Lam Kinh - Lam Sơn", lamKinh, markerLamKinh, "bactrungbo");
// ===== CỬA BIỂN BẠCH ĐẰNG =====
var bachDang = [20.9066, 106.8519];

var markerBachDang = L.marker(bachDang, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerBachDang);
    map.flyTo(bachDang, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Cửa biển Bạch Đằng (Hải Phòng – Quảng Ninh)",

      slides: [
        {
          img: "img/Bachdang.jpg",
          text: `
          <b>Địa danh Bạch Đằng xuất hiện trực tiếp ở câu thơ thứ hai trong bài thơ <a href="tacpham.html#bachdanghaikhau">Bạch Đằng hải khẩu</a>:</b>

  <blockquote>
  <i>"Khinh khởi ngâm phàm quá Bạch Đằng"</i>
  (Buồm thơ nhẹ lướt qua sông Bạch Đằng)
  </blockquote>

  Hình ảnh này cho thấy nhà thơ đang đi thuyền qua cửa biển, 
  vừa ngắm cảnh vừa suy ngẫm về lịch sử. 
  Việc đặt địa danh ở đầu bài thơ có ý nghĩa như một 
  <b>điểm tựa không gian – lịch sử</b> cho toàn bộ cảm xúc của tác giả.

  <br><br>

  Không chỉ xuất hiện bằng tên gọi, 
  <b>Bạch Đằng còn hiện lên qua những hình ảnh gợi dấu tích chiến trận:</b>

  <ul>
    <li>
      <i>“Ngạc đoạn kình khô sơn khúc khúc”</i>
      → Núi non uốn khúc như thân cá sấu, cá kình bị chặt.
    </li>

    <li>
      <i>“Qua trầm kích chiết ngạn tầng tầng”</i>
      → Bờ sông như những lớp giáo gươm gãy chìm.
    </li>
  </ul>

  Những hình ảnh này gợi liên tưởng đến 
  <b>chiến trường xưa còn in dấu vũ khí và xác thuyền chiến</b>, 
  khiến cảnh vật mang màu sắc <b>hào hùng nhưng cũng hoang vắng</b>.
          `,
        },

        {
          img: "img/Bachdang2.jpg",
          text: `
<hr>

<h3> Tư tưởng hòa hợp với thiên nhiên</h3>

<p>
Tư tưởng hòa hợp với thiên nhiên được thể hiện ngắn gọn nhưng rõ nét 
qua cách tác giả cảm nhận cảnh sông núi Bạch Đằng.
</p>

<p>
Trước hết, thiên nhiên hiện lên <b>hùng vĩ và sống động</b> qua những hình ảnh 
như gió bấc thổi mạnh, cửa biển rộng lớn, núi non uốn khúc, bờ sông tầng lớp. 
Nguyễn Trãi không đứng ngoài quan sát mà <b>hòa mình vào cảnh vật</b>, 
thể hiện qua hình ảnh:
</p>

<blockquote>
<i>“Khinh khởi ngâm phàm quá Bạch Đằng”</i>
(Buồm thơ nhẹ lướt qua sông Bạch Đằng)
</blockquote>

<p>
Điều này cho thấy tâm hồn thi nhân đang <b>giao hòa với thiên nhiên</b>, 
vừa thưởng ngoạn cảnh sắc vừa suy ngẫm về lịch sử.
</p>

<p>
Bên cạnh đó, nhà thơ còn nhìn thiên nhiên như <b>một phần của lịch sử 
và vận mệnh dân tộc</b>. Cảnh núi sông hiểm yếu được xem như 
“trời tạo nên”, góp phần giúp các bậc anh hùng lập nên chiến công. 
Như vậy, thiên nhiên không chỉ là cảnh đẹp mà còn gắn bó mật thiết 
với <b>con người và lịch sử</b>.
</p>

<p>
Cuối bài, khi đứng trước dòng sông và nhìn bóng mình trên nước, 
tác giả rơi vào trạng thái <b>trầm tư, lắng đọng</b>, cho thấy 
sự hòa nhập sâu sắc giữa tâm hồn con người với thiên nhiên.
</p>
          `,
        },

        {
          img: "img/Bachdang3.jpg",
          text: `
<hr>

<h3> Tư tưởng nhân nghĩa trong cảm nhận về lịch sử</h3>

<p>
Những hình ảnh:
</p>

<blockquote>
<i>“Ngạc đoạn kình khô sơn khúc khúc”</i>
<i>“Qua trầm kích chiết ngạn tằng tằng”</i>
</blockquote>

<p>
gợi lại dấu tích chiến trận trên sông Bạch Đằng. Tuy nhiên, Nguyễn Trãi 
không miêu tả chiến tranh để ca ngợi sự tàn khốc mà nhằm gợi nhớ 
<b>chiến thắng chính nghĩa của dân tộc trước kẻ xâm lược</b>.
</p>

<p>
Điều này phù hợp với <b>quan niệm nhân nghĩa</b> của ông: 
đánh giặc là để bảo vệ đất nước và cuộc sống của nhân dân.
</p>

<p>
Câu thơ:
</p>

<blockquote>
<i>“Hào kiệt công danh thử địa tằng”</i>
(Nơi đây từng ghi công danh của các bậc hào kiệt)
</blockquote>

<p>
thể hiện sự trân trọng đối với những người đã chiến đấu vì đất nước,
như <b>Ngô Quyền</b> hay <b>Trần Hưng Đạo</b>.
</p>

<p>
Việc ca ngợi các bậc anh hùng chính là biểu hiện của 
<b>tư tưởng nhân nghĩa</b>: tôn vinh những con người hy sinh 
vì cộng đồng và độc lập dân tộc.
</p>

<p>
Ở hai câu cuối:
</p>

<blockquote>
<i>“Vãng sự hồi đầu ta dĩ hĩ,<br>
Lâm lưu phủ ảnh ý nan thăng.”</i>
</blockquote>

<p>
Nguyễn Trãi không say sưa với chiến thắng mà 
<b>trầm ngâm suy ngẫm trước dòng sông lịch sử</b>.
Thái độ này thể hiện một tâm hồn nhân văn, 
coi trọng <b>hòa bình</b> và ý thức sâu sắc về 
<b>sự biến đổi của thời gian</b>.
</p>
          `,
        },
      ],
    });
    openVideoSidebar(
      "video/BachDangHaiKhau.mp4",
      "🎬Ngâm thơ Bạch Đằng hải khẩu",
    );
  });
addLocationItem("Cửa biển Bạch Đằng", bachDang, markerBachDang, "dongbang");
// ===== NÚI DỤC THÚY (NON NƯỚC) =====
var ducThuy = [20.2509, 105.9746];

var markerDucThuy = L.marker(ducThuy, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerDucThuy);
    map.flyTo(ducThuy, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Núi Dục Thúy (Núi Non Nước) – Ninh Bình",

      slides: [
        {
          img: "img/Ducthuy.jpg",
          text: `
          <h3>1. Sự xuất hiện của núi Dục Thúy trong bài Dục Thúy sơn</h3>
<hr>
  Trong bài thơ <a href="tacpham.html#ducthuyson">Dục Thúy sơn</a>, Nguyễn Trãi nhắc đến <b>Núi Dục Thúy</b> ngay từ câu mở đầu:

  <blockquote>
  “Hải khẩu hữu tiên san”<br>
  (Gần cửa biển có núi tiên)
  </blockquote>

  Ngọn núi được giới thiệu như một <b>“núi tiên”</b>, đặt trong không gian gần cửa biển và sông nước rộng lớn.  
  Sau đó, Nguyễn Trãi tiếp tục khắc họa vẻ đẹp của núi qua nhiều hình ảnh:

  <ul>
  <li><i>“Liên hoa phù thủy thượng”</i> – núi như bông sen nổi trên mặt nước.</li>
  <li><i>“Tháp ảnh trâm thanh ngọc”</i> – bóng tháp trên núi như chiếc trâm ngọc cài trên mái tóc xanh của thiên nhiên.</li>
  <li><i>“Ba quang kính thủy hoàn”</i> – ánh nước phản chiếu như tấm gương soi cảnh sắc.</li>
  </ul>

  Nhờ những hình ảnh so sánh giàu tính thẩm mỹ, <b>núi Dục Thúy</b> hiện lên như một cảnh đẹp vừa thực vừa mang vẻ huyền ảo, thanh cao.
          `,
        },

        {
          img: "img/Ducthuy2.jpg",
          text: `
          <h3>2. Sự hòa quyện giữa các yếu tố của thiên nhiên</h3>
<hr>
  Cảnh vật trong bài thơ là sự kết hợp của nhiều yếu tố:

  <ul>
    <li>núi</li>
    <li>nước</li>
    <li>sóng</li>
    <li>ánh sáng</li>
    <li>bóng tháp</li>
  </ul>

  <p><b>Câu thơ:</b></p>

  <blockquote>
  “Ba quang kính thủy hoàn” <br>
  (Ánh sáng trên sóng như gương soi búi tóc biếc.)
  </blockquote>

  <p>
  Hình ảnh này cho thấy nước phản chiếu cảnh núi, tạo nên một không gian thiên nhiên gắn kết và hài hòa. 
  Điều ấy thể hiện quan niệm của Nguyễn Trãi về một thế giới cân bằng và hòa hợp giữa các yếu tố tự nhiên.
  </p>

  <hr>

  <h3>3. Con người hòa mình vào cảnh thiên nhiên</h3>
<hr>
  <p>
  Nguyễn Trãi không đứng ngoài ngắm cảnh mà đặt mình trong không gian thiên nhiên ấy. 
    <blockquote>
  “Tiền niên lũ vãng hoàn.” <br>
  (Năm trước đã nhiều lần đi về.)
  </blockquote>

  Việc ông nhiều lần lui tới nơi này cho thấy:
  </p>

  <ul>
    <li>nhà thơ tìm đến thiên nhiên như một nơi gắn bó thân thuộc</li>
    <li>nơi giúp tâm hồn thanh thản và tĩnh lặng</li>
  </ul>

  <p>
  Như vậy, con người và thiên nhiên trong bài thơ không tách rời mà hòa làm một với nhau.
  </p>
          `,
        },

        {
          img: "img/Ducthuy3.jpg",
          text: `
          <h3>4. Thiên nhiên gắn với chiều sâu văn hóa và cảm xúc</h3>
<hr>
  <p>
  Trong bài thơ <i>Dục Thúy sơn</i>, thiên nhiên không chỉ được cảm nhận như một cảnh đẹp 
  mà còn trở thành không gian lưu giữ ký ức văn hóa và gợi lên cảm xúc sâu lắng của nhà thơ.
  Điều này thể hiện rõ ở hai câu cuối:
  </p>

  <blockquote>
  “Hữu hoài Trương Thiếu Bảo,<br>
  Bi khắc tiễn hoa ban.”<br>
  (Chạnh nhớ tới ông Trương Thiếu Bảo, <br>
Tấm bia đá nói về ông đã lốm đốm rêu phong.)
  </blockquote>

  <p>
  Khi đứng trước cảnh <b>Núi Dục Thúy</b>, Nguyễn Trãi chợt nhớ đến 
  <b>Trương Hán Siêu (Trương Thiếu Bảo)</b> – một danh sĩ nổi tiếng thời Trần 
  từng để lại dấu tích văn hóa tại nơi này.
  </p>

  <p>
  Hình ảnh <i>Tấm bia đá nói về ông đã lốm đốm rêu phong.</i> cho thấy dấu vết của thời gian, 
  khiến cảnh thiên nhiên mang thêm chiều sâu lịch sử. Vì vậy, núi Dục Thúy 
  không chỉ là cảnh đẹp của tạo hóa mà còn là nơi ghi dấu sự hiện diện của 
  những con người tài đức trong quá khứ.
  </p>

  <p>
  Qua đó, thiên nhiên trở thành cầu nối giữa hiện tại và quá khứ. 
  Đứng trước cảnh núi sông, Nguyễn Trãi không chỉ thưởng ngoạn vẻ đẹp của đất trời 
  mà còn bộc lộ tấm lòng trân trọng đối với bậc hiền tài và truyền thống văn hóa dân tộc.
  </p>
          `,
        },
      ],
    });
    openVideoSidebar("video/Ducthuy.mp4", "🎬Núi Dục Thúy");
  });
addLocationItem("Núi Dục Thúy", ducThuy, markerDucThuy, "bactrungbo");
// ===== ĐỘNG THANH HƯ – CÔN SƠN =====
var thanhHu = [21.1127, 106.3885];

var markerThanhHu = L.marker(thanhHu, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerThanhHu);
    map.flyTo(thanhHu, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Động Thanh Hư – Côn Sơn (Chí Linh, Hải Dương)",

      slides: [
        {
          img: "img/Thanhhu.jpg",
          text: `
          <hr>
          <h3>Động Thanh Hư trong bài thơ <a href="tacpham.html#mongsontrung"><i>Mộng sơn trung</i></a></h3>

<p>
Trong bài thơ <b>Mộng sơn trung</b>, Nguyễn Trãi nhắc đến động Thanh Hư ngay ở câu mở đầu:
</p>

<p><i>“Thanh Hư động lý trúc thiên can”</i>
(Trong động Thanh Hư có hàng nghìn cây trúc)</p>

<p>
Địa danh <b>Thanh Hư</b> được đặt ở vị trí đầu bài thơ, trở thành không gian trung tâm
của toàn bộ bức tranh thiên nhiên. Từ không gian ấy, nhà thơ tiếp tục miêu tả:
</p>

<ul>
<li>Trúc mọc dày đặc trong động</li>
<li>Thác nước bay xuống như lớp kính lạnh</li>
<li>Ánh trăng sáng làm bầu trời trong như nước</li>
</ul>

<p>
Nhờ vậy, động Thanh Hư hiện lên như một <b>cảnh giới thiên nhiên thanh tĩnh,
trong trẻo và huyền ảo</b>. Không gian này dần chuyển từ cảnh thực sang cảnh mộng,
khi nhà thơ chiêm bao thấy cưỡi hạc vàng lên cõi tiên.
</p>
<hr>
<p>
Cảnh sắc thanh tĩnh của núi rừng dẫn đến giấc mộng:
</p>

<p><i>“Mộng kỵ hoàng hạc thượng tiên đàn”</i>
(Chiêm bao thấy cưỡi hạc vàng lên cõi tiên)</p>

<p>
Giấc mơ này cho thấy thiên nhiên đã nâng tâm hồn con người vượt lên khỏi
thế giới trần tục, hướng tới <b>sự tự do và thanh cao</b>. Đây là biểu hiện của
sự hòa hợp sâu sắc giữa thiên nhiên và đời sống tinh thần của con người.
</p>
<hr>
<p>
Qua cảnh động Thanh Hư và giấc mộng cưỡi hạc, Nguyễn Trãi thể hiện khát vọng:
</p>

<ul>
<li>tìm sự thanh tĩnh cho tâm hồn</li>
<li>thoát khỏi những lo toan, ràng buộc của cuộc đời</li>
</ul>

<p>
Thiên nhiên vì thế trở thành <b>không gian tinh thần lý tưởng</b>,
nơi con người tìm thấy sự bình yên và tự do.
</p>
          `,
        },

        {
          img: "img/Thanhhu2.jpg",
          text: `
          <h3> Quan niệm sống và tư tưởng nhân nghĩa trong Côn Sơn ca</h3>
          <h3>1. Khát vọng sống thanh cao, trong sạch</h3>

<p>
Không gian <b>động Thanh Hư</b> với trúc, thác nước và ánh trăng tạo nên một
thế giới thiên nhiên thanh tĩnh. Việc nhà thơ hòa mình vào cảnh núi rừng
cho thấy khát vọng <b>giữ gìn tâm hồn trong sạch, tránh xa sự bon chen
và danh lợi</b>.
</p>

<p>
Đây chính là biểu hiện của tư tưởng <b>nhân nghĩa</b>: con người cần giữ đạo đức
và phẩm giá, sống thanh bạch và ngay thẳng.
</p>

<hr>

<h3>2. Hướng tới đời sống tinh thần cao đẹp</h3>

<p>Hình ảnh:</p>

<p>
<i>“Mộng kỵ hoàng hạc thượng tiên đàn”</i>
(Chiêm bao thấy cưỡi hạc vàng lên cõi tiên)
</p>

<p>
thể hiện mong muốn vượt lên khỏi những ràng buộc tầm thường của đời sống
trần tục, hướng tới một <b>thế giới tinh thần thanh cao</b>.
</p>

<p>
Điều này phản ánh quan niệm nhân nghĩa của Nguyễn Trãi: con người nên
hướng tới những giá trị tinh thần tốt đẹp hơn là chạy theo
vật chất và quyền lực.
</p>

<hr>

<h3>3. Thể hiện nhân cách và khí tiết của người trí thức</h3>

<p>
Giấc mộng cưỡi hạc lên cõi tiên không phải là sự trốn tránh cuộc đời mà là
biểu hiện của <b>nhân cách thanh cao của người trí thức</b>.
</p>

<p>
Qua đó, Nguyễn Trãi khẳng định rằng người có đạo lý phải biết
<b>giữ khí tiết, sống đúng với lẽ phải</b> và không bị cuốn theo
những điều thấp kém.
</p>
          `,
        },

        {
          img: "img/Thanhhu3.jpg",
          text: `
          <h3>Bài thơ: <i>Mộng sơn trung</i></h3>

<p><b>Nguyễn Trãi</b></p>

<p>
Thanh Hư động lý trúc thiên can,<br>
Phi bộc phi phi lạc kính hàn.<br>
Tạc dạ nguyệt minh thiên tự thuỷ,<br>
Mộng kỵ hoàng hạc thượng tiên đàn.
</p>

<h4>Dịch nghĩa</h4>

<p>
Trong động Thanh Hư có hàng nghìn cây trúc,<br>
Thác nước bay xuống như lớp kính lạnh.<br>
Đêm qua trăng sáng trời như nước,<br>
Chiêm bao thấy cưỡi hạc vàng lên cõi tiên.
</p>

<hr>
          `,
        },
      ],
    });
    openVideoSidebar(
      "video/Thanhhu.mp4",
      "🎬Vở chèo Động Thanh Hư tưởng nhớ Anh hùng dân tộc Nguyễn Trãi",
    );
  });
addLocationItem("Động Thanh Hư - Chí Linh", thanhHu, markerThanhHu, "dongbang");
// ===== VÂN ĐỒN – QUẢNG NINH =====

var vanDon = [21.0715, 107.4208];

var markerVanDon = L.marker(vanDon, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerVanDon);
    map.flyTo(vanDon, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Vân Đồn – Quảng Ninh",

      slides: [
        {
          img: "img/Vandon.webp",
          text: `
           <h3>1. Sự xuất hiện của Vân Đồn trong bài thơ Vân Đồn</h3>
<hr>
  <p>
  Trong bài thơ <a href="tacpham.html#vandon">Vân Đồn</a>, Nguyễn Trãi nhắc đến địa danh Vân Đồn ngay từ câu mở đầu:
  </p>

  <blockquote>
  “Lộ nhập Vân Đồn sơn phục sơn”<br>
  (Đường vào Vân Đồn núi non trùng điệp)
  </blockquote>

  <p>
  Địa danh Vân Đồn được đặt ở vị trí trung tâm của bài thơ, mở ra một không gian thiên nhiên 
  rộng lớn và hùng vĩ. Từ đó, nhà thơ tiếp tục miêu tả cảnh sắc đặc trưng của vùng biển đảo:
  </p>

  <ul>
    <li>Núi non chồng lớp, tạo cảm giác trùng trùng điệp điệp.</li>
    <li>Mặt biển xanh trong như gương .</li>
    <blockquote>
    “lam bích trừng minh kính”
    </blockquote>
    <li>Màu nước và núi hòa quyện như mái tóc xanh rủ xuống.</li>
  </ul>

  <p>
  Qua những hình ảnh này, <b>Vân Đồn</b> hiện lên như một bức tranh thiên nhiên rộng lớn, 
  vừa hùng vĩ vừa thơ mộng.
          `,
        },

        {
          img: "img/Vandon2.jpg",
          text: `
          <h3>2. Sự hòa quyện giữa các yếu tố thiên nhiên</h3>
<hr>
  <p>
  Bức tranh thiên nhiên trong bài thơ được tạo nên bởi sự kết hợp của nhiều yếu tố:
  </p>

  <ul>
    <li>núi</li>
    <li>biển</li>
    <li>bầu trời</li>
    <li>ánh sáng</li>
    <li>màu sắc của nước và cây cỏ</li>
  </ul>

  <p><b>Câu thơ:</b></p>

  <blockquote>
  "Thiên khôi địa thiết phó kỳ quan.<br>
  Nhất bàn lam bích trừng minh kính”<br>
  (Trời đất cao rộng rõ là cảnh diệu kỳ.<br>
  Cả một mặt phẳng màu xanh biếc, nước trong như gương sáng,)
  </blockquote>

  <p>
  Hình ảnh này cho thấy biển phản chiếu trời và núi, tạo nên sự hòa hợp giữa các yếu tố của thiên nhiên.
  Điều đó thể hiện cảm nhận của Nguyễn Trãi về một thế giới tự nhiên cân bằng và hài hòa.
  </p>

  <hr>
 <h3>3. “Vạn hộc nha thanh đỏa thúy hoàn”</h3>

  <blockquote>
  (Hàng vạn ô màu huyền xanh như mái tóc rũ.)
  </blockquote>

  <p>
  Câu thơ sử dụng hình ảnh so sánh giàu tính thẩm mỹ. Những dãy núi và đảo ở Vân Đồn 
  được nhìn như mái tóc xanh buông rủ trên mặt biển.
  </p>

  <p>
  Hình ảnh này vừa gợi màu sắc xanh thẳm của núi và cây, vừa tạo cảm giác mềm mại, 
  uyển chuyển cho cảnh vật. Nhờ vậy, thiên nhiên không chỉ hùng vĩ mà còn thơ mộng 
  và sống động trong cảm nhận của thi nhân.
  </p>

  <hr>

  <h3>4. “Vũ trụ đốn thanh trần hải nhạc,”</h3>

  <blockquote>
  (Vũ trụ bỗng thể hiện rõ ràng qua dáng núi và biển,)
  </blockquote>

  <p>
  Ở câu thơ này, thiên nhiên được nâng lên thành biểu tượng của toàn bộ vũ trụ. 
  Núi và biển không chỉ là cảnh vật cụ thể mà còn phản chiếu trật tự và sự 
  trong sạch của đất trời.
  </p>

  <p>
  Từ <i>“đốn thanh”</i> (bỗng trở nên trong sáng, rõ ràng) cho thấy khi đứng trước 
  cảnh biển núi Vân Đồn, nhà thơ cảm nhận được sự thanh lọc của không gian thiên nhiên, 
  khiến tâm hồn con người cũng trở nên sáng tỏ và bình lặng.
  </p>
  
          `,
        },

        {
          img: "img/Vandon3.jpg",
          text: `
          <h3>5. Thiên nhiên tác động đến tâm hồn con người</h3>
<hr>
  <p>
  Khi đứng trước cảnh biển trời rộng lớn, nhà thơ cảm nhận được sự vững vàng trong tâm hồn:
  </p>

  <blockquote>
  “Phong ba bất động thiết tâm can”<br>
  (Sóng gió chẳng lay chuyển được tâm can vững chắc.)
  </blockquote>

  <p>
  Thiên nhiên không chỉ là cảnh đẹp mà còn giúp con người củng cố ý chí và tâm thế.
  Tâm hồn con người trở nên bình tĩnh và mạnh mẽ khi hòa mình vào không gian rộng lớn của đất trời.
  </p>

  <hr>

  <h3>6. Con người hòa mình vào không gian thiên nhiên và đời sống vùng biển</h3>
<hr>
  <p>
  Ở hai câu cuối,
  <blockquote>
  "Vọng trung ngạn thảo thê thê lục, <br>
Đạo thị phiên nhân trú bạc loan."
  (Nhìn vào thấy bờ cỏ màu lục xanh dờn, <br>
Nghe nói người thiểu số xưa từng đỗ thuyền trong vịnh.)
  </blockquote>
  Nguyễn Trãi nhìn thấy bờ cỏ xanh và nhớ đến những con thuyền từng neo đậu trong vịnh.
  Điều này cho thấy thiên nhiên không tách rời đời sống con người mà gắn bó với sinh hoạt và lịch sử của vùng biển.
  </p>

  <p>
  Nhờ vậy, cảnh Vân Đồn hiện lên như một không gian sống nơi thiên nhiên và con người cùng tồn tại hài hòa.
          `,
        },
      ],
    });
    openVideoSidebar(
      "video/Vandon.mp4",
      "🎬Đặc khu Vân Đồn và sự phát triển trong thời đại mới",
    );
  });
addLocationItem("Vân Đồn", vanDon, markerVanDon, "dongbang");
// ===== NÚI YÊN TỬ =====
var yenTu = [21.1706, 106.7047];

var markerYenTu = L.marker(yenTu, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerYenTu);
    map.flyTo(yenTu, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Núi Yên Tử (Quảng Ninh – Bắc Giang)",

      slides: [
        {
          img: "img/Yentu.jpg",
          text: `
          <h3>1. Sự xuất hiện của núi Yên Tử trong bài <a href="tacpham.html#deyentusonhoayentu"
          ><i>Đề Yên Tử sơn Hoa Yên tự</i></a
        ></h3>

<p>Trong bài thơ, <b>Nguyễn Trãi</b> nhắc đến <b>Núi Yên Tử</b> ngay ở câu mở đầu:</p>

<blockquote>
“Yên sơn sơn thượng tối cao phong”<br>
<span>(Núi Yên Tử là đỉnh cao nhất của dãy núi)</span>
</blockquote>

<p>Hình ảnh này đặt Yên Tử vào vị trí trung tâm của không gian thiên nhiên, nhấn mạnh độ cao và sự hùng vĩ của ngọn núi. Từ đỉnh núi ấy, nhà thơ miêu tả cảnh bình minh:</p>

<blockquote>
“Tài ngũ canh sơ nhật chính hồng”<br>
<span>(Mới đầu canh năm mặt trời đã đỏ rực)</span>
</blockquote>

<p>Cảnh mặt trời mọc trên đỉnh núi làm nổi bật vẻ đẹp kỳ vĩ và trong trẻo của thiên nhiên vùng Yên Tử.</p>

<p>Ở những câu tiếp theo, Nguyễn Trãi mở rộng tầm nhìn:</p>

<blockquote>
“Vũ trụ nhãn cùng thương hải ngoại”<br>
<span>(Vũ trụ thấu hết trong tầm mắt ngoài biển xanh)</span>
</blockquote>

<p>Từ đỉnh núi cao, tầm mắt nhà thơ bao quát cả không gian rộng lớn của đất trời và biển cả, tạo nên cảm giác về một vũ trụ bao la.</p>

<p>Đồng thời, bài thơ còn nhắc đến:</p>

<blockquote>
“Nhân miếu đương niên di tích tại” 
</blockquote>

<p>Đây là dấu tích gắn với <b>Trần Nhân Tông</b>, vị vua đã tu hành và sáng lập <b>Thiền phái Trúc Lâm</b> tại Yên Tử. Điều này khiến Yên Tử hiện lên không chỉ là cảnh đẹp thiên nhiên mà còn là <b>không gian lịch sử và tâm linh của dân tộc</b>.</p>
          `,
        },

        {
          img: "img/Yentu2.webp",
          text: `
          

<h3>2.Triết lý buông bỏ danh lợi, hòa mình vào thiên nhiên</h3>

<p>Ngay từ câu mở đầu:</p>

<blockquote>
“Yên sơn sơn thượng tối cao phong”
</blockquote>

<p>Hình ảnh đỉnh núi cao nhất tạo nên một không gian tách biệt khỏi thế giới trần tục. Núi cao trong thơ trung đại thường tượng trưng cho nơi con người rời bỏ danh lợi để tìm đến sự thanh tịnh.</p>

<p>Đứng trên đỉnh Yên Tử, con người có thể nhìn bao quát:</p>

<blockquote>
“Vũ trụ nhãn cùng thương hải ngoại”
</blockquote>

<p>Tầm nhìn bao quát vũ trụ cho thấy tâm hồn nhà thơ đã thoát khỏi những ràng buộc nhỏ bé của đời sống danh lợi, hướng tới sự rộng lớn của trời đất. Đây chính là biểu hiện của tư tưởng buông bỏ những ham muốn vật chất để đạt đến sự tự do tinh thần.</p>

<hr>


<p>Các câu thơ:</p>

<blockquote>
“Tiếu đàm nhân tại bích vân trung<br>
Ủng môn ngọc sóc sâm thiên mẫu”
</blockquote>

<p>gợi nên hình ảnh con người sống giữa mây núi và rừng cây. Không gian này:</p>

<ul>
<li>xa rời chốn quan trường</li>
<li>tách khỏi sự ồn ào của xã hội</li>
<li>hòa mình vào cảnh thiên nhiên thanh tịnh.</li>
</ul>

<p>Thiên nhiên ở đây không chỉ là cảnh đẹp mà còn là môi trường tinh thần giúp con người đạt tới trạng thái <b>“nhàn”</b>: tâm hồn bình thản, tự do và không bị danh lợi chi phối.</p>

<hr>


<p>Yên Tử gắn liền với sự tu hành của <b>Trần Nhân Tông</b>, vị vua sau khi lãnh đạo đất nước chiến thắng ngoại xâm đã từ bỏ ngai vàng để tu hành. Khi Nguyễn Trãi viết:</p>

<blockquote>
“Nhân miếu đương niên di tích tại”
</blockquote>

<p>ông không chỉ nhắc đến một di tích lịch sử mà còn gợi lên <b>tấm gương buông bỏ quyền lực và vinh hoa phú quý</b>.</p>

<p>Tấm gương này thể hiện một triết lý sâu sắc:</p>

<ul>
<li>quyền lực và danh vọng chỉ là tạm thời</li>
<li>đời sống tinh thần mới là giá trị bền vững.</li>
</ul>

<hr>


<p>Triết lý buông bỏ danh lợi trong bài thơ không mang ý nghĩa thoát ly hoàn toàn khỏi xã hội, mà là một trạng thái tinh thần:</p>

<ul>
<li>không bị danh lợi ràng buộc</li>
<li>giữ tâm hồn thanh cao</li>
<li>sống hòa hợp với thiên nhiên và đạo lý.</li>
</ul>

<p>Điều này rất gần với tư tưởng <b>“nhàn” của Nho – Phật – Đạo</b>, nơi con người tìm thấy sự bình yên nội tâm giữa thiên nhiên, nhưng vẫn giữ trách nhiệm với cuộc đời.</p>
          `,
        },

        {
          img: "img/Yentu3.jpg",
          text: `
          <hr>

<h3>3. Vẻ đẹp thơ mộng và thanh khiết của thiên nhiên</h3>

<p>Hình ảnh:</p>

<blockquote>
“Tài ngũ canh sơ nhật chính hồng.”<br>
<span>(Mới đầu canh năm mặt trời đã đỏ rực)</span>
</blockquote>

<p>Gợi lên khoảnh khắc <b>bình minh trên đỉnh núi</b>. Ánh mặt trời đỏ rực xuất hiện trong làn sương sớm tạo nên một bức tranh thiên nhiên <b>tươi sáng, tinh khôi và đầy sức sống</b>.</p>

<p>Khoảnh khắc ấy làm nổi bật vẻ đẹp thuần khiết của thiên nhiên khi ngày mới bắt đầu, khiến cảnh núi rừng Yên Tử trở nên thơ mộng và đầy thi vị.</p>

<hr>

<p>Câu thơ:</p>

<blockquote>
“Tiếu đàm nhân tại bích vân trung”<br>
<span>(Tiếng người cười nói từ mây biếc vọng tới)</span>
</blockquote>

<p>Gợi hình ảnh con người sống giữa mây xanh và núi cao. Làn mây bao phủ núi rừng tạo nên một không gian mờ ảo, nhẹ nhàng như cõi tiên.</p>

<p>Sự hòa quyện giữa con người, mây trời và núi rừng khiến thiên nhiên hiện lên vừa thực vừa huyền, tạo nên vẻ đẹp rất thơ mộng.</p>

<hr>

<p>Hai câu thơ:</p>

<blockquote>
“Ứng môn ngọc sóc sâm thiên mẫu<br>
Quái thạch châu lưu lạc bán không”
</blockquote>

<p>Miêu tả rừng cây và thác nước trên núi:</p>

<ul>
<li>rừng cây xanh tốt vươn cao như giáo ngọc</li>
<li>dòng nước từ vách đá buông xuống như chuỗi ngọc giữa không trung.</li>
</ul>

<p>Những hình ảnh so sánh này làm cho thiên nhiên Yên Tử hiện lên <b>trong sáng, tinh khiết và mềm mại</b>, giống như một bức tranh thiên nhiên đầy chất thơ.</p>

<hr>

<p>Thiên nhiên Yên Tử không ồn ào mà mang vẻ <b>tĩnh lặng và thanh khiết</b>. Chính sự tĩnh lặng này tạo nên cảm giác bình yên, giúp con người dễ dàng hòa mình vào cảnh vật và cảm nhận vẻ đẹp tinh thần của thiên nhiên.</p>
          `,
        },
      ],
    });
    openVideoSidebar("video/Yentu.mp4", "🎬Núi Yên Tử");
  });
addLocationItem("Núi Yên Tử", yenTu, markerYenTu, "dongbang");
// ===== CHÙA NGỌC THANH – ĐÔNG TRIỀU =====
var ngocThanh = [21.1097, 106.6029];

var markerNgocThanh = L.marker(ngocThanh, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerNgocThanh);
    map.flyTo(ngocThanh, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Chùa – quán Ngọc Thanh (Đông Triều, Quảng Ninh)",

      slides: [
        {
          img: "img/NgocThanh.webp",
          text: `
          <h3>1. Sự xuất hiện của Ngọc Thanh quán trong bài thơ <a href="tacpham.html#dengocthanhquan"><i>Đề Ngọc Thanh quán</i></a> </h3>

<p>Trong bài thơ, <b>Nguyễn Trãi</b> nhắc đến <b>Ngọc Thanh quán</b> ngay từ câu mở đầu:</p>

<blockquote>
“Tử phủ lâu đài ỷ bích sầm,”<br>
<span>(Lâu đài phủ tía dựa trên núi biếc,)</span>
</blockquote>

<p>Hình ảnh “lầu đài phủ tía” gợi lên không gian đạo quán thanh tịnh, huyền ảo, nằm dựa vào núi xanh. Từ đó, nhà thơ tiếp tục khắc họa cảnh vật của Ngọc Thanh quán:</p>

<ul>
<li><b>Hoa thông rụng, đàn đá tĩnh lặng</b> – không gian vắng vẻ, thanh tịnh.</li>
<li><b>Tiếng chuông vang qua mây</b> – gợi chiều sâu của chốn đạo viện.</li>
<li><b>Rừng trúc, tiếng vượn và hạc</b> – tạo nên bức tranh thiên nhiên hoang sơ, tĩnh lặng.</li>
</ul>

<p>Qua những chi tiết này, Ngọc Thanh quán hiện lên như một không gian linh thiêng và tách biệt khỏi thế giới trần tục.</p>
          `,
        },

        {
          img: "img/NgocThanh2.webp",
          text: `
          <hr>

<h3>2. Con người hòa mình vào không gian thiên nhiên</h3>

<p>Nguyễn Trãi không chỉ quan sát cảnh vật mà còn trở lại thăm nơi này sau nhiều năm:</p>

<blockquote>
“Thập niên kim tịch nhất đăng lâm”<br>
<span>(Mười năm qua, chiều nay mới trở lại thăm.)</span>
</blockquote>

<p>Việc quay lại chốn núi rừng cho thấy nhà thơ xem thiên nhiên như <b>nơi gắn bó thân thuộc</b>, nơi ông tìm thấy sự tĩnh lặng và bình yên cho tâm hồn.</p>

<hr>

<h3>3. Thiên nhiên giúp con người suy ngẫm về cuộc đời</h3>

<p>Cảnh đạo quán vắng lặng, hoa rơi và tiếng chuông vang xa gợi cảm giác tĩnh tại và sâu lắng, khiến nhà thơ liên tưởng đến:</p>

<ul>
<li><b>sự đổi thay của thời gian</b></li>
<li><b>sự phù du của cuộc sống</b></li>
</ul>

<p>Thiên nhiên vì thế trở thành <b>không gian giúp con người chiêm nghiệm về đời sống và danh lợi</b>.</p>
          `,
        },

        {
          img: "img/NgocThanh3.webp",
          text: `
          <hr>

<h3>4. Nuôi dưỡng tư tưởng sống thanh liêm, coi nhẹ danh lợi</h3>

<p>Không gian của <b>Ngọc Thanh quán</b> được miêu tả với núi xanh, rừng trúc, hoa thông rơi và sự tĩnh lặng của đạo viện. Cảnh sắc ấy gợi nên lối sống <b>thanh tịnh, xa rời danh lợi</b>.</p>

<p>Điều này góp phần củng cố quan niệm của <b>Nguyễn Trãi</b> rằng người làm chính trị cần giữ tâm hồn <b>trong sạch</b>, không bị danh lợi chi phối. Một người có tâm thanh liêm mới có thể thực hiện lý tưởng <b>trị quốc vì dân</b>.</p>

<hr>

<h3>5. Gợi suy ngẫm về sự phù du của quyền lực</h3>

<p>Trong bài thơ có hình ảnh <i>“Hoàng lương mộng”(Tỉnh giấc mộng kê vàng)</i> – biểu tượng cho sự hư ảo của vinh hoa phú quý. Khi đứng trước không gian tĩnh lặng của đạo quán, Nguyễn Trãi càng nhận ra rằng <b>quyền lực và danh vọng chỉ là tạm thời</b>.</p>

<p>Nhận thức này giúp hình thành quan điểm chính trị của ông: việc trị nước không nhằm tìm kiếm vinh danh cá nhân mà phải hướng đến <b>lợi ích lâu dài của đất nước và nhân dân</b>.</p>

<hr>

<h3>6. Bồi dưỡng tinh thần nhân nghĩa và lòng thương dân</h3>

<p>Chốn đạo quán vốn gắn với tư tưởng <b>Phật – Đạo</b>, đề cao lòng từ bi, sự hòa hợp và thanh tịnh. Những giá trị tinh thần này phù hợp với tư tưởng <b>nhân nghĩa, lấy dân làm gốc</b> trong quan điểm chính trị của Nguyễn Trãi.</p>

<p>Nhờ vậy, trong các trước tác lớn của ông như <i>Bình Ngô đại cáo</i>, lý tưởng trị quốc luôn gắn với mục tiêu <b>yên dân</b>, đem lại cuộc sống hòa bình và ổn định cho nhân dân.</p>
          `,
        },
      ],
    });
    openVideoSidebar("video/Ngocthanh.mp4", "🎬Chùa - Quán Ngọc Thanh");
  });
addLocationItem(
  "Chùa - quán Ngọc Thanh",
  ngocThanh,
  markerNgocThanh,
  "dongbang",
);
// ===== CỬA BIỂN THẦN PHÙ =====
var thanPhu = [20.008, 105.972];

var markerThanPhu = L.marker(thanPhu, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerThanPhu);
    map.flyTo(thanPhu, 12, {
      duration: 1.5,
    });
    openSidebar({
      title: "Cửa biển Thần Phù (Thanh Hóa)",

      slides: [
        {
          img: "img/Thanphu.jpg",
          text: `
          <h3>1. Sự xuất hiện của cửa biển Thần Phù trong bài <a href="tacpham.html#quathanphuhaikhau"><i>Quá Thần Phù hải khẩu</i></a></h3>

<p>Trong bài thơ, <b>Nguyễn Trãi</b> nhắc đến <b>Cửa biển Thần Phù</b> ngay ở câu mở đầu:</p>

<blockquote>
“Thần Phù hải khẩu dạ trung qua”<br>
<span>(Qua cửa biển Thần Phù vào lúc giữa đêm)</span>
</blockquote>

<p>Địa danh này mở ra <b>không gian thiên nhiên biển cả rộng lớn</b>, nơi nhà thơ đang trên hành trình vượt biển trong đêm. Khung cảnh được khắc họa bằng những chi tiết rất sinh động:</p>

<ul>
<li>gió mát, trăng sáng: <i>“phong thanh nguyệt bạch”</i></li>
<li>núi ven bờ như búp măng ngọc</li>
<li>dòng nước giữa sông như rắn xanh uốn lượn</li>
</ul>

<p>Những hình ảnh giàu tính tạo hình này làm cho cửa biển Thần Phù hiện lên vừa <b>hùng vĩ</b> vừa <b>thơ mộng</b>, trở thành trung tâm của bức tranh thiên nhiên trong bài thơ.</p>

<hr>

<h3> Ý nghĩa của hình ảnh cửa biển Thần Phù</h3>

<h4>a. Không gian thiên nhiên rộng lớn và kỳ vĩ</h4>

<p>Cảnh biển đêm với gió, trăng, núi và dòng nước tạo nên một bức tranh thiên nhiên <b>bao la và sống động</b>.</p>

<p>Hình ảnh:</p>

<blockquote>
“Giáp ngạn thiên phong bài ngọc duẩn”<br>
<span>(Gần bờ nhìn ngọn núi bày ra như búp măng ngọc)</span>
</blockquote>

<p>và</p>

<blockquote>
“Trung lưu nhất thủy tẩu thanh xà”<br>
<span>(Giữa dòng con nước chảy như rắn xanh)</span>
</blockquote>

<p>cho thấy cách quan sát tinh tế của Nguyễn Trãi, biến cảnh vật thiên nhiên thành những hình ảnh giàu chất thơ và gợi cảm.</p>

<h4>b. Không gian gợi suy ngẫm về lịch sử và thời gian</h4>

<p>Đứng trước cảnh sông núi vẫn còn nguyên vẹn, nhà thơ liên tưởng đến sự thay đổi của con người và lịch sử:</p>

<blockquote>
“Giang sơn như tạc anh hùng thệ”<br>
<span>(Non sông như cũ nhưng anh hùng đã mất)</span>
</blockquote>

<p>Cảnh thiên nhiên bất biến làm nổi bật sự <b>biến đổi của thời gian và số phận con người</b>, khiến nhà thơ suy ngẫm về lịch sử và những anh hùng đã qua.</p>
          `,
        },

        {
          img: "img/Thanphu2.jpg",
          text: `
          <h3>2. Tư tưởng hòa mình với thiên nhiên trong bài thơ</h3>

<h4>a. Con người cảm nhận thiên nhiên bằng tâm hồn tinh tế</h4>

<p>Trong hành trình đi qua cửa biển ban đêm, Nguyễn Trãi không chỉ nhìn thấy cảnh vật mà còn cảm nhận vẻ đẹp của thiên nhiên bằng <b>tâm hồn nhạy cảm</b>.</p>

<p>Gió mát, trăng sáng, núi và dòng nước đều trở thành nguồn cảm hứng giúp nhà thơ hòa mình vào cảnh vật.</p>

<h4>b. Thiên nhiên trở thành không gian chiêm nghiệm</h4>

<p>Thiên nhiên trong bài thơ không chỉ là cảnh đẹp mà còn là nơi khơi gợi suy tư của con người. Từ cảnh sông núi, nhà thơ nghĩ đến:</p>

<ul>
<li>sự biến đổi của lịch sử</li>
<li>sự mất đi của các bậc anh hùng</li>
<li>khát vọng hòa bình cho đất nước.</li>
</ul>

<h4>c. Thiên nhiên gắn với niềm tin vào hòa bình của dân tộc</h4>

<p>Ở hai câu cuối:</p>

<blockquote>
“Hồ Việt nhất gia kim hạnh đổ,<br>
Tứ minh tòng thử tức kinh ba.”<br>
<span>(Nay được thấy Hồ, Việt một nhà là điều may mắn,<br>
Bốn biển từ nay hết cảnh sóng kình.)</span>
</blockquote>

<p>Nguyễn Trãi bày tỏ niềm vui khi đất nước thống nhất và hy vọng biển trời từ nay yên bình. Thiên nhiên biển cả vì vậy trở thành <b>biểu tượng cho hòa bình và sự ổn định của đất nước</b>.</p>
          `,
        },

        {
          img: "img/Thanphu3.jpg",
          text: `
          <h3>Bài thơ: <i>Quá Thần Phù hải khẩu</i></h3>

<p><b>Tác giả:Nguyễn Trãi</b></p>
<hr>
<p>
Thần Phù hải khẩu dạ trung qua,<br>
Nại thử phong thanh nguyệt bạch hà.<br>
Giáp ngạn thiên phong bài ngọc duẩn,<br>
Trung lưu nhất thuỷ tẩu thanh xà.<br>
Giang sơn như tạc anh hùng thệ,<br>
Thiên địa vô tình sự biến đa.<br>
Hồ Việt nhất gia kim hạnh đổ,<br>
Tứ minh tòng thử tức kình ba.
</p>

<h4>Dịch nghĩa</h4>

<p>
Qua cửa khẩu Thần Phù vào lúc giữa đêm,<br>
Gió mát trăng thanh quá, làm sao đây?<br>
Gần bờ nhìn ngọn núi bày ra như búp măng ngọc,<br>
Giữa dòng con nước chảy như rắn xanh.<br>
Non sông như cũ nhưng anh hùng đã mất,<br>
Trời đất vô tình tạo nên bao nhiêu biến đổi.<br>
Nay được thấy Hồ, Việt một nhà là điều may mắn,<br>
Bốn biển từ nay hết cảnh sóng kình.
</p>

<hr>
          `,
        },
      ],
    });
    openVideoSidebar("video/Thanphu.mp4", "🎬Cửa biển Thần Phù");
  });
addLocationItem("Cửa biển Thần Phù", thanPhu, markerThanPhu, "bactrungbo");
// ================= Thăng Long =================
// ================= Thăng Long =================
var thangLong = [21.0285, 105.8542];

var markerThangLong = L.marker(thangLong, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerThangLong);

    map.flyTo(thangLong, 12, {
      duration: 1.5,
    });

    openSidebar({
      title: "Hoàng thành Thăng Long – Hà Nội",

      slides: [
        {
          img: "img/Thanglong.jpg",
          text: `
          <h3>Lịch sử của Hoàng thành Thăng Long gắn với cuộc đời của Nguyễn Trãi</h3>

<hr>

<h3>1. Hoàng thành Thăng Long – trung tâm quyền lực mà Nguyễn Trãi hoạt động</h3>

<p><b>Hoàng thành Thăng Long</b> là trung tâm chính trị của quốc gia từ thời <b>Nhà Lý, Nhà Trần đến Nhà Lê sơ</b>.</p>

<p>Sau khi cuộc khởi nghĩa Lam Sơn do <b>Lê Lợi</b> lãnh đạo thắng lợi năm 1427, kinh đô được khôi phục tại Thăng Long. Từ đây, Hoàng thành trở thành <b>nơi điều hành quốc gia và là trung tâm chính trị lớn nhất Đại Việt</b>.</p>

<p><b>Nguyễn Trãi</b>, với vai trò <b>khai quốc công thần</b>, đã trực tiếp tham gia các hoạt động triều chính tại Hoàng thành:</p>

<ul>
<li>bàn bạc chiến lược xây dựng đất nước sau chiến tranh</li>
<li>tham gia hoạch định chính sách đối nội và đối ngoại</li>
<li>soạn thảo nhiều văn thư quan trọng của triều đình.</li>
</ul>

<hr>

<h3>2. Nơi công bố những văn kiện chính trị quan trọng của Nguyễn Trãi</h3>

<p>Sau chiến thắng chống quân Minh, tại Thăng Long đã công bố bản tuyên ngôn nổi tiếng:</p>

<ul>
<li><a href="tacpham.html#binhngodaicao"><b>Bình Ngô đại cáo</b></a></li>
</ul>

<p>Đây được xem là <b>tuyên ngôn độc lập của Đại Việt thế kỷ XV</b>, khẳng định:</p>

<ul>
<li>chủ quyền dân tộc</li>
<li>sức mạnh của nhân dân</li>
<li>tư tưởng “lấy nhân nghĩa làm gốc”.</li>
</ul>

<p>Văn kiện này gắn liền với không gian chính trị của Hoàng thành, nơi triều đình chính thức tuyên bố nền độc lập sau hơn 20 năm bị nhà Minh đô hộ.</p>
          `,
        },

        {
          img: "img/Thanglong2.jpg",
          text: `
          <h3>3. Hoàng thành – nơi Nguyễn Trãi thực hiện lý tưởng trị quốc</h3>

<p>Trong thời gian làm quan tại Thăng Long, Nguyễn Trãi luôn theo đuổi lý tưởng <b>trị quốc an dân</b>. Ông nhiều lần dâng sớ lên vua đề nghị:</p>

<ul>
<li>giảm sưu thuế cho dân</li>
<li>chăm lo đời sống nông nghiệp</li>
<li>khôi phục kinh tế sau chiến tranh.</li>
</ul>

<p>Những tư tưởng này được thể hiện rõ trong các tác phẩm như:</p>

<ul>
<li><i>Quân trung từ mệnh tập</i></li>
<li><i>Ức Trai thi tập</i></li>
</ul>

<p>Hoàng thành Thăng Long vì thế không chỉ là nơi ông làm quan mà còn là <b>không gian thực hiện lý tưởng chính trị của mình</b>.</p>

<hr>

<h3>4. Hoàng thành chứng kiến những thăng trầm trong sự nghiệp của ông</h3>

<p>Dù là công thần lớn của triều đình, Nguyễn Trãi vẫn gặp nhiều mâu thuẫn trong triều chính.</p>

<p>Do sự ganh ghét của một số quan lại, ông nhiều lần:</p>

<ul>
<li>bị nghi kỵ</li>
<li>xin cáo quan về ở ẩn tại <b>Côn Sơn</b>.</li>
</ul>

<p>Sau đó, ông vẫn được triều đình mời trở lại phục vụ đất nước.</p>
          `,
        },

        {
          img: "img/Thanglong3.jpg",
          text: `
          <h3>5. Hoàng thành gián tiếp liên quan đến bi kịch cuối đời của Nguyễn Trãi</h3>

<p>Một biến cố lớn trong lịch sử triều Lê là <b>Vụ án Lệ Chi Viên</b>.</p>

<p>Sau khi vua <b>Lê Thái Tông</b> qua đời đột ngột tại Lệ Chi Viên (nay thuộc thôn Đại Lai, xã Đại Lai, huyện Gia Bình, tỉnh Bắc Ninh), Nguyễn Trãi và gia đình bị kết tội và chịu án tru di.</p>

<p>Mãi đến năm 1464, vua <b>Lê Thánh Tông</b> mới minh oan cho ông.</p>

<p>Như vậy, Hoàng thành Thăng Long cũng là <b>trung tâm quyền lực gắn với cả vinh quang lẫn bi kịch trong cuộc đời Nguyễn Trãi</b>.</p>
          `,
        },
      ],
    });
    openVideoSidebar("video/Thanglong.mp4", "🎬Hoàng thành Thăng Long");
  });
addLocationItem(
  "Hoàng thành Thăng Long",
  thangLong,
  markerThangLong,
  "dongbang",
);
// ===== ẢI CHI LĂNG (LẠNG SƠN) =====
var chiLang = [21.8514, 106.6297];

var markerChiLang = L.marker(chiLang, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerChiLang);
    map.flyTo(chiLang, 12, {
      duration: 1.5,
    });

    openSidebar({
      title: "Ải Chi Lăng – Lạng Sơn",

      slides: [
        {
          img: "img/Aichilang.jpg",
          text: `
<div class="sidebar-section">
  <h3>1. Trong Bình Ngô đại cáo (1428)</h3>

  <p><b>Tác phẩm nổi tiếng nhất nhắc đến Chi Lăng là:</b><br>
  <a href="tacpham.html#binhngodaicao">Bình Ngô đại cáo</a></p>

  <p><b>Đoạn nổi tiếng:</b></p>

  <blockquote>
    “Ngày mười tám, trận Chi Lăng, Liễu Thăng thất thế,<br>
    Ngày hai mươi, trận Mã Yên, Liễu Thăng cụt đầu...”
  </blockquote>

  <p>
    Ở đây Nguyễn Trãi nhắc đến trận Chi Lăng năm 1427,
    nơi quân Lam Sơn tiêu diệt đạo quân viện binh nhà Minh
    do Liễu Thăng chỉ huy.
  </p>
</div>
          `,
        },

        {
          img: "img/Aichilang2.jpg",
          text: `
          <hr>
          <h2>Chiến thắng Chi Lăng</h2>

<p>
Ải Chi Lăng (Lạng Sơn) là cửa ngõ chiến lược bảo vệ vùng đồng bằng Bắc Bộ.
Với địa hình thung lũng hẹp, hai bên là núi cao hiểm trở, nơi đây từ lâu
được xem là vị trí thuận lợi để chặn đánh quân xâm lược từ phương Bắc.
</p>

<p>
Năm 1427, trong cuộc khởi nghĩa Lam Sơn do <b>Lê Lợi</b> lãnh đạo,
nghĩa quân đã tổ chức trận mai phục lớn tại Chi Lăng để chặn
đạo viện binh của quân Minh do tướng <b>Liễu Thăng</b> chỉ huy.
</p>

<p>
Khi quân Minh tiến sâu vào thung lũng, nghĩa quân bất ngờ tấn công.
Liễu Thăng bị tiêu diệt, quân Minh hoảng loạn tháo chạy.
Chiến thắng này mở đầu cho chuỗi thất bại của quân Minh và
góp phần quyết định vào thắng lợi của khởi nghĩa Lam Sơn.
</p>

<p>
Trong cuộc kháng chiến ấy, <b>Nguyễn Trãi</b> đóng vai trò quan trọng
trong việc hoạch định chiến lược và cổ vũ tinh thần chiến đấu của nghĩa quân.
</p>
          `,
        },

        {
          img: "img/Aichilang3.webp",
          text: `
          <h2>Ý nghĩa lịch sử</h2>

<p>
Chiến thắng Chi Lăng là một trong những trận đánh quan trọng
nhất của cuộc khởi nghĩa Lam Sơn, góp phần làm tan rã lực lượng
viện binh của quân Minh và buộc chúng phải rút quân khỏi Đại Việt.
</p>

<p>
Trong <b>Bình Ngô đại cáo</b>, Nguyễn Trãi đã khẳng định
tính chính nghĩa của cuộc kháng chiến:
</p>

<blockquote>
“Việc nhân nghĩa cốt ở yên dân,<br>
Quân điếu phạt trước lo trừ bạo.”
</blockquote>

<p>
Những chiến thắng như Chi Lăng không chỉ thể hiện tài
chiến lược của nghĩa quân Lam Sơn mà còn phản ánh
tư tưởng nhân nghĩa của Nguyễn Trãi:
chiến đấu để bảo vệ nhân dân và giành lại độc lập cho đất nước.
</p>
          `,
        },
      ],
    });
    openVideoSidebar("video/Aichilang.mp4", "🎬Ải Chi Lăng");
  });
addLocationItem("Ải Chi Lăng", chiLang, markerChiLang, "dongbang");
// ===== LÀNG NHỊ KHÊ (THƯỜNG TÍN - HÀ NỘI) =====
var nhiKhe = [20.8433, 105.8506];

var markerNhiKhe = L.marker(nhiKhe, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerNhiKhe);
    map.flyTo(nhiKhe, 13, {
      duration: 1.5,
    });

    openSidebar({
      title: "Làng Nhị Khê – Thường Tín, Hà Nội",

      slides: [
        {
          img: "img/nhikhe.jpg",
          text: `
          <h3>Làng Nhị Khê – quê hương của Nguyễn Trãi</h3>

<p><b>Làng Nhị Khê</b> là quê cha của Nguyễn Trãi, nơi gắn bó mật thiết với cuộc đời và sự nghiệp của ông. Và đã được nhắc đến trong tác phẩm <a href="tacpham.html#tanghuunhan">Tặng hữu nhân</a> của Nguyễn Trãi cùng nhiều tác phẩm khác khi ông nhắc đến quê cha.</p>
<blockquote>
<i>“Tha niên Nhị Khê ước,”</i>
(Chúng ta đã hẹn nhau nơi Nhị Khê này,)
</blockquote>


<h3>1. Vị trí địa lý</h3>
<p>
Nhị Khê là một ngôi làng thuộc xã Nhị Khê, huyện Thường Tín, nằm ở phía nam Hà Nội.
Đây là vùng đất có truyền thống văn hiến lâu đời, nổi tiếng với nhiều nhân vật lịch sử
và nghề thủ công truyền thống.
</p>
          `,
        },

        {
          img: "img/nhikhe2.webp",
          text: `
<h3>2. Mối liên hệ với Nguyễn Trãi</h3>

<p>
Nguyễn Trãi sinh năm 1380 trong một gia đình khoa bảng. Cha ông là
<b>Nguyễn Phi Khanh</b> – một trí thức nổi tiếng thời cuối nhà Trần.
</p>

<p>
Nhị Khê được xem là quê cha và nơi thờ tự chính của Nguyễn Trãi,
nơi lưu giữ nhiều di tích gắn với cuộc đời ông.
</p>
          `,
        },

        {
          img: "img/nhikhe3.webp",
          text: `
<h3>3. Di tích liên quan đến Nguyễn Trãi tại Nhị Khê</h3>

<p>Tại làng Nhị Khê hiện còn nhiều di tích tưởng niệm ông, tiêu biểu là:</p>

<ul>
<li><b>Đền thờ Nguyễn Trãi</b> – nơi thờ Nguyễn Trãi và gia tộc.</li>
<li><b>Nhà lưu niệm Nguyễn Trãi</b> – lưu giữ tư liệu, hiện vật về cuộc đời và sự nghiệp của ông.</li>
</ul>

<p>
Những di tích này trở thành địa điểm văn hóa – lịch sử quan trọng,
giúp hậu thế tưởng nhớ công lao của vị anh hùng dân tộc và danh nhân văn hóa.
</p>

<h3>4. Ý nghĩa của quê hương Nhị Khê</h3>

<p>
Làng Nhị Khê không chỉ là nơi sinh trưởng của Nguyễn Trãi mà còn góp phần
hình thành nhân cách, tư tưởng nhân nghĩa và tình yêu đất nước của ông.
</p>

<p>
Ngày nay, nơi đây được xem là một địa chỉ văn hóa tiêu biểu,
gắn với tên tuổi của vị anh hùng dân tộc và danh nhân văn hóa thế giới
<b>Nguyễn Trãi</b>.
</p>
          `,
        },
      ],
    });
    openVideoSidebar("video/Nhikhe.mp4", "🎬Làng Nhị Khê");
  });
addLocationItem("Làng Nhị Khê", nhiKhe, markerNhiKhe, "dongbang");
// ===== Chùa Đông Sơn =====
var chuaDongSon = [19.850000574259662, 105.78309528052783];

var markerchuaDongSon = L.marker(chuaDongSon, { icon: normalIcon })
  .addTo(map)
  .on("click", function () {
    highlightMarker(markerchuaDongSon);
    map.flyTo(chuaDongSon, 13, {
      duration: 1.5,
    });

    openSidebar({
      title: "Chùa Đông Sơn (Thanh Hóa)",

      slides: [
        {
          img: "img/chuadongson.png",
          text: `
          <h3>1. Chùa Đông Sơn trong không gian lịch sử Thanh Hóa</h3>

<p>
Chùa Đông Sơn nằm ở vùng đất Thanh Hóa – khu vực từng là trung tâm căn cứ của
cuộc kháng chiến Lam Sơn do <b>Lê Lợi</b> lãnh đạo trong Khởi nghĩa Lam Sơn.
</p>

<p>
Trong thời kỳ đầu thế kỷ XV, vùng Thanh Hóa không chỉ là căn cứ quân sự
mà còn là không gian văn hóa – tín ngưỡng quan trọng, nơi tồn tại nhiều
chùa chiền và di tích Phật giáo. Chùa Đông Sơn là một trong những địa điểm
gắn với đời sống tinh thần của vùng đất này.
</p>
          `,
        },

        {
          img: "img/chuadongson2.webp",
          text: `
<h3>2. Mối liên hệ với hoạt động của Nguyễn Trãi trong khởi nghĩa Lam Sơn</h3>

<p>
Trong quá trình tham gia khởi nghĩa Lam Sơn, <b>Nguyễn Trãi</b> nhiều lần
hoạt động và đi lại ở khu vực Thanh Hóa – nơi tập trung các căn cứ nghĩa quân.
</p>

<p>
Những địa điểm như Lam Sơn, Lam Kinh và các chùa cổ trong vùng,
trong đó có chùa Đông Sơn, trở thành không gian sinh hoạt tinh thần
của nghĩa quân và các trí thức yêu nước.
</p>

<ul>
<li>nghĩa quân có thể nghỉ chân và bàn bạc việc quân</li>
<li>các trí thức như Nguyễn Trãi suy ngẫm về vận mệnh đất nước</li>
<li>nuôi dưỡng tư tưởng nhân nghĩa và lòng yêu nước</li>
</ul>
<h3>3. Không gian văn hóa – tôn giáo ảnh hưởng đến tư tưởng Nguyễn Trãi</h3>

<p>
Các chùa cổ ở Thanh Hóa, bao gồm chùa Đông Sơn,
thể hiện truyền thống Phật giáo lâu đời của vùng đất này.
</p>

<p>
Không gian chùa chiền thanh tịnh góp phần nuôi dưỡng trong Nguyễn Trãi:
</p>

<ul>
<li>tinh thần từ bi của Phật giáo</li>
<li>tư tưởng khoan hòa và nhân nghĩa</li>
<li>lối sống hướng nội và suy tư triết lý</li>
</ul>

<p>
Những yếu tố này sau đó được thể hiện rõ trong nhiều tác phẩm của ông
như <b>Ức Trai thi tập</b>, nơi thiên nhiên và đời sống tinh thần hòa quyện.
</p>
          `,
        },

        {
          img: "img/chuadongson3.jpg",
          text: `
<h3>4. Ý nghĩa của chùa Đông Sơn trong bối cảnh lịch sử Lam Sơn</h3>

<ul>
<li>là không gian văn hóa – tâm linh của vùng căn cứ</li>
<li>góp phần gắn kết tinh thần của nghĩa quân và nhân dân</li>
<li>tạo môi trường để các lãnh tụ và trí thức suy nghĩ về con đường cứu nước</li>
</ul>

<p>
<b>Kết luận:</b> Chùa Đông Sơn tuy không phải trung tâm chính trị của
khởi nghĩa Lam Sơn nhưng nằm trong không gian văn hóa và lịch sử
của vùng Thanh Hóa – nơi Nguyễn Trãi hoạt động và phò tá Lê Lợi.
Di tích này góp phần phản ánh bối cảnh văn hóa và tinh thần
đã nuôi dưỡng lý tưởng nhân nghĩa và khát vọng cứu nước của Nguyễn Trãi.
</p>
          `,
        },
      ],
    });
    openVideoSidebar("video/Dongson.mp4", "🎬Chùa Đông Sơn");
  });
addLocationItem("Chùa Đông Sơn", chuaDongSon, markerchuaDongSon, "bactrungbo");
// ================= SIDEBAR =================
let slides = [];
let slideIndex = 0;

function openSidebar(data) {
  document.getElementById("title").innerHTML = data.title;

  slides = data.slides;
  slideIndex = 0;

  updateSlide();

  const sidebar = document.getElementById("sidebar");

  sidebar.classList.remove("closing");
  sidebar.classList.add("active");

  document.getElementById("mainHeader").classList.add("hide");
}

function updateSlide() {
  document.getElementById("slider").src = slides[slideIndex].img;
  document.getElementById("description").innerHTML = slides[slideIndex].text;
}

function nextImage() {
  slideIndex = (slideIndex + 1) % slides.length;
  updateSlide();
}

function prevImage() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  updateSlide();
}

map.on("click", function (e) {
  if (!document.getElementById("sidebar").contains(e.originalEvent.target)) {
    closeSidebar();
  }
});

// GO HOME NÚT
function goHome() {
  location.href = "index.html";
}

// ĐÓNG SIDEBAR
function closeSidebar() {
  const sidebar = document.getElementById("sidebar");

  sidebar.classList.remove("active");
  sidebar.classList.add("closing");

  setTimeout(() => {
    sidebar.classList.remove("closing");
  }, 450);

  document.getElementById("mainHeader").classList.remove("hide");
}
// ===== NÚT X =====
document.getElementById("close-btn").addEventListener("click", function (e) {
  closeVideoSidebar();
  e.stopPropagation(); // không cho map bắt sự kiện
  closeSidebar();
});

// ================= ĐIỀU HƯỚNG TỪ MỤC LỤC =================
function focusPlace(place) {
  const locations = {
    bachdang: {
      coords: bachDang,
      zoom: 10,
      action: () => map.eachLayer((l) => {}),
    },
    conson: { coords: chiLinh, zoom: 13 },
    yentu: { coords: yenTu, zoom: 13 },
    vandon: { coords: vanDon, zoom: 13 },
    thanphu: { coords: thanPhu, zoom: 13 },
    ngocthanh: { coords: ngocThanh, zoom: 13 },
    thanhhu: { coords: thanhHu, zoom: 13 },
    lamkinh: { coords: lamKinh, zoom: 13 },
    ducthuy: { coords: ducThuy, zoom: 13 },
    thanglong: { coords: thangLong, zoom: 13 },
    aichilang: { coords: chiLang, zoom: 13 },
    nhikhe: { coords: nhiKhe, zoom: 13 },
    chuadongson: { coords: chuaDongSon, zoom: 13 },
  };

  const loc = locations[place];
  if (!loc) return;

  map.setView(loc.coords, loc.zoom);

  // Mô phỏng click marker
  setTimeout(() => {
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        if (
          layer.getLatLng().lat === loc.coords[0] &&
          layer.getLatLng().lng === loc.coords[1]
        ) {
          layer.fire("click");
        }
      }
    });
  }, 400);
}

// đọc url
window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  const place = params.get("place");
  if (place) {
    setTimeout(() => focusPlace(place), 700);
  }
});
const videoSidebar = document.getElementById("videoSidebar");
const closeVideo = document.getElementById("closeVideo");
const consonVideo = document.getElementById("consonVideo");

// mở video sidebar với video cụ thể
function openVideoSidebar(videoSrc, title) {
  const video = document.getElementById("consonVideo");
  const titleEl = document.querySelector(".video-header h3");

  // Cập nhật video source
  video.src = videoSrc;
  video.load();

  // Cập nhật title nếu có
  if (title) {
    titleEl.innerHTML = title;
  }

  videoSidebar.classList.add("active");
}

// đóng video sidebar
function closeVideoSidebar() {
  videoSidebar.classList.remove("active");
  consonVideo.pause();
}

// đóng video
closeVideo.onclick = () => {
  closeVideoSidebar();
};
