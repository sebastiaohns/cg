# Created by the script cgal_create_cmake_script
# This is the CMake script for compiling a CGAL application.

project (cgal_cg)

cmake_minimum_required(VERSION 3.1)
if(NOT POLICY CMP0070 AND POLICY CMP0053)
  # Only set CMP0053 to OLD with CMake<3.10, otherwise there is a warning.
  cmake_policy(SET CMP0053 OLD)
endif()

if(POLICY CMP0071)
  cmake_policy(SET CMP0071 NEW)
endif()

set(CMAKE_AUTOMOC TRUE)
set(CMAKE_INCLUDE_CURRENT_DIR TRUE)

find_package(CGAL COMPONENTS Qt5)
find_package(Qt5 QUIET COMPONENTS Widgets)

if ( NOT CGAL_FOUND OR NOT CGAL_Qt5_FOUND OR NOT Qt5_FOUND )
  message(STATUS "NOTICE: This demo requires CGAL and Qt5, and will not be compiled.")
  return()
endif()

add_definitions(-DQT_NO_KEYWORDS)


#--------------------------------
# The "Delaunay" demo: cgal_cg
#--------------------------------
qt5_wrap_ui( D_UI_FILES cgal_cg.ui)
# The executable itself.
add_executable  ( cgal_cg
  cgal_cg.cpp ${D_UI_FILES} ${CGAL_Qt5_RESOURCE_FILES} ${D_RES_FILE})
target_link_libraries( cgal_cg
  PRIVATE CGAL::CGAL CGAL::CGAL_Qt5 Qt5::Widgets)

add_to_cached_list( CGAL_EXECUTABLE_TARGETS cgal_cg )

include(${CGAL_MODULES_DIR}/CGAL_add_test.cmake)
foreach(target
    Constrained_cgal_cg
    cgal_cg
    Regular_triangulation_2)
  cgal_add_compilation_test(${target})
endforeach()

