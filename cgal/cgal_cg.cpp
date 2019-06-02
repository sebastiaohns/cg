#include <fstream>
#include <cmath>

// CGAL headers
#include <CGAL/Cartesian.h>
#include <CGAL/Exact_predicates_inexact_constructions_kernel.h>
#include <CGAL/Delaunay_triangulation_2.h>
#include <CGAL/convex_hull_2.h>
#include <CGAL/point_generators_2.h>
#include <CGAL/Polygon_2.h>
#include <CGAL/Real_timer.h>

// Qt headers
#include <QtGui>
#include <QString>
#include <QActionGroup>
#include <QFileDialog>
#include <QInputDialog>
#include <QGraphicsRectItem>

// GraphicsView items and event filters (input classes)
#include <CGAL/Qt/PointsGraphicsItem.h>
#include <CGAL/Qt/PolygonGraphicsItem.h>
#include <CGAL/Qt/GraphicsViewPolylineInput.h>
#include <CGAL/Qt/TriangulationGraphicsItem.h>
#include <CGAL/Qt/VoronoiGraphicsItem.h>

// for viewportsBbox
#include <CGAL/Qt/utility.h>
  
// the two base classes
#include "ui_cgal_cg.h"
#include <CGAL/Qt/DemosMainWindow.h>

typedef CGAL::Exact_predicates_inexact_constructions_kernel K;

typedef K::Point_2 Point_2;
typedef K::Iso_rectangle_2 Iso_rectangle_2;

typedef CGAL::Polygon_2<K> Polygon_2;
typedef CGAL::Delaunay_triangulation_2<K> Delaunay;

class MainWindow :

  public CGAL::Qt::DemosMainWindow,
  public Ui::cgal_cg

{
  Q_OBJECT
  
private:  

  Delaunay dt; 
  QGraphicsScene scene;  

  // Models
  Polygon_2 convex_hull;
  std::vector<Point_2> points;
  
  // Graphics Items
  CGAL::Qt::PointsGraphicsItem<std::vector<Point_2> > * pgi;
  CGAL::Qt::PolygonGraphicsItem<Polygon_2> * convex_hull_gi;
  
  // Input Filters
  CGAL::Qt::GraphicsViewPolylineInput<K> * pi;
  CGAL::Qt::TriangulationGraphicsItem<Delaunay> * dgi;
  CGAL::Qt::VoronoiGraphicsItem<Delaunay> * vgi;

private: // Functions

  void InsertRandomPoints();

public:

  MainWindow();

public Q_SLOTS:

  void on_actionShowDelaunay_toggled(bool checked);

  void on_actionShowVoronoi_toggled(bool checked);

  void on_actionShowConvexHull_toggled(bool checked);

Q_SIGNALS:

  void changed();
};


MainWindow::MainWindow()
  : DemosMainWindow()
{
  setupUi(this);

  this->graphicsView->setAcceptDrops(false);

  //Insert the points with a random function
  InsertRandomPoints();

  //Compute the Convex Hull of the points
  CGAL::convex_hull_2(points.begin(), points.end(), std::back_inserter(convex_hull));

  // Graphics Item for the input POINT SET
  pgi = new CGAL::Qt::PointsGraphicsItem<std::vector<Point_2> >(&points);
  QObject::connect(this, SIGNAL(changed()), pgi, SLOT(modelChanged()));
  pgi->setVerticesPen(QPen(Qt::black, 5, Qt::SolidLine, Qt::RoundCap, Qt::RoundJoin));
  scene.addItem(pgi);

  // Graphics Item for the CONVEX HULL
  convex_hull_gi = new CGAL::Qt::PolygonGraphicsItem<Polygon_2>(&convex_hull);
  QObject::connect(this, SIGNAL(changed()), convex_hull_gi, SLOT(modelChanged()));
  convex_hull_gi->setEdgesPen(QPen(Qt::green, 3, Qt::SolidLine, Qt::RoundCap, Qt::RoundJoin));
  scene.addItem(convex_hull_gi);

  // Graphic Item for the DELAUNAY triangulation
  dgi = new CGAL::Qt::TriangulationGraphicsItem<Delaunay>(&dt);
  QObject::connect(this, SIGNAL(changed()), dgi, SLOT(modelChanged()));
  dgi->setVerticesPen(QPen(Qt::red, 3, Qt::SolidLine, Qt::RoundCap, Qt::RoundJoin));
  scene.addItem(dgi);

  // Graphic Item for the VORONOI diagram
  vgi = new CGAL::Qt::VoronoiGraphicsItem<Delaunay>(&dt);
  QObject::connect(this, SIGNAL(changed()), vgi, SLOT(modelChanged()));
  vgi->setEdgesPen(QPen(Qt::blue, 3, Qt::SolidLine, Qt::RoundCap, Qt::RoundJoin));
  scene.addItem(vgi);

  // We put mutually exclusive actions in an QActionGroup
  QActionGroup* ag = new QActionGroup(this);

  // Check the actions 
  this->actionShowDelaunay->setChecked(true);
  this->actionShowVoronoi->setChecked(true);
  this->actionShowConvexHull->setChecked(true);

  //Recenter the view
  this->graphicsView->setSceneRect(pgi->boundingRect());
  this->graphicsView->fitInView(pgi->boundingRect(), Qt::KeepAspectRatio);

  // Setup the scene and the view
  scene.setItemIndexMethod(QGraphicsScene::NoIndex);
  scene.setSceneRect(-100, -100, 100, 100);
  this->graphicsView->setScene(&scene);
  this->graphicsView->setMouseTracking(true);

  // Turn the vertical axis upside down
  this->graphicsView->matrix().scale(1, -1);
}

void MainWindow::on_actionShowDelaunay_toggled(bool checked)
{
	dgi->setVisibleEdges(checked);
}


void MainWindow::on_actionShowVoronoi_toggled(bool checked)
{
	vgi->setVisible(checked);
}

void MainWindow::on_actionShowConvexHull_toggled(bool checked)
{
	convex_hull_gi->setVisible(checked);
}

void MainWindow::InsertRandomPoints()
{
	CGAL::Random_points_in_iso_rectangle_2<Point_2> pg(Point_2(0,0), Point_2(400,400));

	const int number_of_points = 20;

	points.reserve(number_of_points);

	for(int i = 0; i < number_of_points; ++i)
	{
		points.push_back(*pg++);
	}

	dt.insert(points.begin(), points.end());
}

#include "cgal_cg.moc"
#include <CGAL/Qt/resources.h>

int main(int argc, char **argv)
{
  QApplication app(argc, argv);

  // Import resources from libCGAL (QT5).
  CGAL_QT_INIT_RESOURCES;

  MainWindow mainWindow;
  mainWindow.show();

  QStringList args = app.arguments();
  args.removeAt(0);
  Q_FOREACH(QString filename, args)
  {
	  mainWindow.open(filename);
  }

  return app.exec();
}
